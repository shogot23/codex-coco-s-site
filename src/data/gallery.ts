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
    name: "小説",
    items: [
      { title: "サンプル小説A", image: "/placeholder-1.jpg", genre: "小説", note: "あとで差し替え" },
      { title: "サンプル小説B", image: "/placeholder-2.jpg", genre: "小説" },
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
    name: "歴史",
    items: [
      { title: "サンプル歴史A", image: "/placeholder-5.jpg", genre: "歴史" },
      { title: "サンプル歴史B", image: "/placeholder-6.jpg", genre: "歴史" },
    ],
  },
];
