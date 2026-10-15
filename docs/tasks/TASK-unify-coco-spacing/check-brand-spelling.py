#!/usr/bin/env python3
"""Check exact Japanese site-name spelling in tracked text and Astro build output. Requires Python 3.8+."""

from __future__ import annotations

from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
import os
import re
import subprocess
import sys
import unicodedata
from typing import Optional

REPO_ROOT = Path(__file__).resolve().parents[3]
EXPECTED = "読書 with Coco"
RAW_WHITESPACE = r"(?:[^\S\r\n]|\r?\n(?![ \t]*\r?\n))*"
PUNCTUATION = r"(?:[^\w\s\x00]|_)"
RAW_SEPARATOR = rf"{RAW_WHITESPACE}(?:{PUNCTUATION}{RAW_WHITESPACE}){{0,4}}"
VISIBLE_SEPARATOR = rf"\s*(?:{PUNCTUATION}\s*){{0,4}}"
# Longer English tokens such as "Coconuts" are intentionally not brand candidates.
CANDIDATE = re.compile(
    rf"読書{RAW_SEPARATOR}with{RAW_SEPARATOR}coco(?![A-Za-z0-9_])",
    re.IGNORECASE,
)
VISIBLE_CANDIDATE = re.compile(
    rf"読書{VISIBLE_SEPARATOR}with{VISIBLE_SEPARATOR}coco(?![A-Za-z0-9_])",
    re.IGNORECASE,
)
EXCLUDED_PREFIXES = ("docs/tasks/", "inbox/")
BINARY_SUFFIXES = {
    ".avif", ".gif", ".heic", ".ico", ".jpeg", ".jpg", ".pdf", ".png",
    ".mov", ".mp4", ".otf", ".ttf", ".webp", ".woff", ".woff2", ".zip",
}
# Split semantic blocks and list/table containers because HTMLParser does not evaluate CSS.
BLOCK_TAGS = {
    "address", "article", "aside", "blockquote", "body", "dd", "details",
    "button", "caption", "colgroup", "dialog", "div", "dl", "dt",
    "fieldset", "figcaption", "figure", "hgroup",
    "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head",
    "header", "hr", "html", "legend", "li", "main", "menu", "nav", "ol",
    "optgroup", "option", "p", "pre", "search", "section", "select",
    "summary", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul",
}
BLOCK_BOUNDARY = "\0\0\0"
SUPPRESSED_TAGS = {"script", "style", "template"}


class VisibleTextParser(HTMLParser):
    """Join inline HTML text while keeping block and hidden-content boundaries."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.suppressed_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, Optional[str]]]) -> None:
        if tag in SUPPRESSED_TAGS:
            self.suppressed_depth += 1
            return
        if self.suppressed_depth:
            return
        if tag == "br":
            self.parts.append("\n")
        elif tag in BLOCK_TAGS:
            self.parts.append(BLOCK_BOUNDARY)

    def handle_endtag(self, tag: str) -> None:
        if tag in SUPPRESSED_TAGS and self.suppressed_depth:
            self.suppressed_depth -= 1
            return
        if not self.suppressed_depth and tag in BLOCK_TAGS:
            self.parts.append(BLOCK_BOUNDARY)

    def handle_data(self, data: str) -> None:
        if not self.suppressed_depth:
            self.parts.append(data)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, Optional[str]]]) -> None:
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)


def extract_visible_html(content: str) -> str:
    parser = VisibleTextParser()
    parser.feed(content)
    parser.close()
    return "".join(parser.parts)


def read_text(path: Path) -> tuple[Optional[str], Optional[str]]:
    try:
        raw = path.read_bytes()
    except OSError as error:
        return None, f"unreadable: {error}"
    if b"\0" in raw or path.suffix.lower() in BINARY_SUFFIXES:
        return None, "binary"
    try:
        return raw.decode("utf-8"), None
    except UnicodeDecodeError as error:
        return None, f"undecodable text: {error}"


def find_candidates(content: str, pattern: re.Pattern[str] = CANDIDATE) -> list[str]:
    """Search NFKC-normalized characters; per-character mapping keeps original spans."""
    if unicodedata.is_normalized("NFKC", content):
        normalized_content = content
        original_indices = range(len(content))
    else:
        normalized_parts = []
        index_map = []
        for index, character in enumerate(content):
            normalized = unicodedata.normalize("NFKC", character)
            normalized_parts.append(normalized)
            index_map.extend([index] * len(normalized))
        normalized_content = "".join(normalized_parts)
        original_indices = index_map

    return [
        content[original_indices[match.start()] : original_indices[match.end() - 1] + 1]
        for match in pattern.finditer(normalized_content)
    ]


def main() -> int:
    index_path = REPO_ROOT / "dist" / "index.html"
    if not index_path.is_file():
        print("missing required build output: dist/index.html", file=sys.stderr)
        return 2

    try:
        result = subprocess.run(
            ["git", "ls-files", "-z"],
            cwd=REPO_ROOT,
            check=True,
            capture_output=True,
        )
    except (OSError, subprocess.CalledProcessError) as error:
        print(f"could not list tracked files: {error}", file=sys.stderr)
        return 2

    relative_paths = [
        os.fsdecode(item)
        for item in result.stdout.split(b"\0")
        if item and not os.fsdecode(item).startswith(EXCLUDED_PREFIXES)
    ]
    paths = {REPO_ROOT / relative for relative in relative_paths}
    dist_root = REPO_ROOT / "dist"
    paths.update(path for path in dist_root.rglob("*") if path.is_file())

    invalid_by_file: dict[str, list[tuple[str, str]]] = defaultdict(list)
    scan_errors = []
    binary_skipped = 0
    candidate_count = 0
    exact_count = 0
    index_candidate_count = 0
    scanned_files = 0

    for path in sorted(paths):
        content, error = read_text(path)
        if error == "binary":
            binary_skipped += 1
            continue
        if error:
            scan_errors.append(f"{path}: {error}")
            continue
        if content is None:
            scan_errors.append(f"{path}: unreadable content")
            continue

        scanned_files += 1
        relative = path.relative_to(REPO_ROOT).as_posix()
        detections = [
            ("source", spelling)
            for spelling in find_candidates(content)
        ]
        if relative.startswith("dist/") and path.suffix.lower() in {".html", ".htm"}:
            visible_text = extract_visible_html(content)
            detections.extend(
                ("visible_html", spelling)
                for spelling in find_candidates(visible_text, VISIBLE_CANDIDATE)
            )

        if relative == "dist/index.html":
            index_candidate_count = len(detections)
        for source, spelling in detections:
            candidate_count += 1
            if spelling == EXPECTED:
                exact_count += 1
            else:
                invalid_by_file[relative].append((source, spelling))

    invalid_count = sum(len(items) for items in invalid_by_file.values())
    print(f"scanned_files={scanned_files}")
    print(f"binary_files_skipped={binary_skipped}")
    print(f"candidate_detections={candidate_count}")
    print(f"exact_detections={exact_count}")
    print(f"dist_index_candidates={index_candidate_count}")
    print(f"invalid_detections={invalid_count}")
    print(f"scan_errors={len(scan_errors)}")
    for filename, detections in sorted(invalid_by_file.items()):
        examples = ", ".join(f"{source}={spelling!r}" for source, spelling in detections[:3])
        print(f"{filename}: {len(detections)} invalid detection(s): {examples}")
    for error in scan_errors[:10]:
        print(error, file=sys.stderr)

    if scan_errors:
        return 2
    if candidate_count == 0 or index_candidate_count == 0:
        print("no spelling candidates were found; refusing an empty-pass result", file=sys.stderr)
        return 2
    return 1 if invalid_count else 0


if __name__ == "__main__":
    raise SystemExit(main())
