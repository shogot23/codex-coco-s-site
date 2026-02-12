export type ReviewItem = {
  title: string;
  summary: string;
  learnings: string[];
};

export const reviews: ReviewItem[] = [
  {
    title: "サンプル本 01",
    summary: "一言要約のサンプル。",
    learnings: ["学び1", "学び2", "学び3"],
  },
  {
    title: "サンプル本 02",
    summary: "一言要約のサンプル。",
    learnings: ["学び1", "学び2", "学び3"],
  },
];
