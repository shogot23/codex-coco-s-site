/**
 * @deprecated Use Content Collection (src/content/gallery/) instead.
 * This file will be removed in a future update.
 */

export type GalleryItem = {
  title: string;
  image: string;
  genre: string;
  note?: string;
};

export type GalleryGenre = {
  name: string;
  items: GalleryItem[];
};

export const galleryGenres: GalleryGenre[] = [
  {
    name: "現代文学",
    items: [
      { title: "サンプル小説A", image: "/placeholder-1.jpg", genre: "現代文学", note: "あとで差し替え" },
      { title: "サンプル小説B", image: "/placeholder-2.jpg", genre: "現代文学" },
    ],
  },
  {
    name: "ビジネス",
    items: [
      { title: "サンプルビジネスA", image: "/placeholder-3.jpg", genre: "ビジネス" },
      { title: "サンプルビジネスB", image: "/placeholder-4.jpg", genre: "ビジネス" },
    ],
  },
  {
    name: "歴史教養",
    items: [
      { title: "サンプル歴史A", image: "/placeholder-5.jpg", genre: "歴史教養" },
      { title: "サンプル歴史B", image: "/placeholder-6.jpg", genre: "歴史教養" },
    ],
  },
];
