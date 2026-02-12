export type VideoItem = {
  title: string;
  date: string; // YYYY-MM-DD
  thumbnail: string;
  url?: string; // 将来YouTube/Instagramなど
};

export const videos: VideoItem[] = [
  { title: "Sora動画サンプル 01", date: "2026-02-01", thumbnail: "/video-thumb-1.jpg" },
  { title: "Sora動画サンプル 02", date: "2026-02-05", thumbnail: "/video-thumb-2.jpg" },
  { title: "Sora動画サンプル 03", date: "2026-02-10", thumbnail: "/video-thumb-3.jpg" },
];
