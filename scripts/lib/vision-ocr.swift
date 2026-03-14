import Foundation
import Vision

struct VisionLine: Codable {
  let text: String
  let confidence: Float
}

enum VisionOcrError: Error {
  case missingImagePath
}

guard CommandLine.arguments.count > 1 else {
  throw VisionOcrError.missingImagePath
}

let imagePath = CommandLine.arguments[1]
let imageUrl = URL(fileURLWithPath: imagePath)
let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.recognitionLanguages = ["ja-JP", "en-US"]
request.usesLanguageCorrection = true

let handler = VNImageRequestHandler(url: imageUrl)
try handler.perform([request])

let lines: [VisionLine] = (request.results ?? []).compactMap { observation in
  observation.topCandidates(1).first.map { candidate in
    VisionLine(text: candidate.string, confidence: candidate.confidence)
  }
}

let encoder = JSONEncoder()
encoder.outputFormatting = [.withoutEscapingSlashes]
let data = try encoder.encode(lines)
FileHandle.standardOutput.write(data)
