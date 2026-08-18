import type { Locale } from "@/shared/i18n/config";

export type Category = {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  count: number;
  color: string;
};

export const categories: Category[] = [
  {
    id: "career",
    slug: "career",
    name: { ko: "커리어", ja: "キャリア" },
    description: { ko: "개발자로 살아가는 이야기", ja: "エンジニアとして生きる話" },
    count: 12,
    color: "#3b82f6",
  },
  {
    id: "tech",
    slug: "tech",
    name: { ko: "기술", ja: "技術" },
    description: { ko: "탐구하고 실험하는 개발 기록", ja: "探求と実験の開発記録" },
    count: 24,
    color: "#8b5cf6",
  },
  {
    id: "news",
    slug: "news",
    name: { ko: "소식", ja: "ニュース" },
    description: { ko: "업계 동향과 새로운 발견", ja: "業界の動向と新しい発見" },
    count: 8,
    color: "#f97316",
  },
  {
    id: "life",
    slug: "life",
    name: { ko: "일상", ja: "日常" },
    description: { ko: "코드 밖에서 보내는 시간들", ja: "コードの外で過ごす時間" },
    count: 15,
    color: "#22c55e",
  },
  {
    id: "review",
    slug: "review",
    name: { ko: "리뷰", ja: "レビュー" },
    description: { ko: "책, 도구, 서비스 솔직 후기", ja: "本、ツール、サービスの正直な感想" },
    count: 9,
    color: "#eab308",
  },
  {
    id: "essay",
    slug: "essay",
    name: { ko: "에세이", ja: "エッセイ" },
    description: { ko: "생각을 글로 풀어내는 공간", ja: "思考を言葉にする場所" },
    count: 7,
    color: "#ec4899",
  },
  {
    id: "oss",
    slug: "oss",
    name: { ko: "오픈소스", ja: "OSS" },
    description: { ko: "함께 만드는 소프트웨어 세계", ja: "共に作るソフトウェアの世界" },
    count: 11,
    color: "#14b8a6",
  },
  {
    id: "tutorial",
    slug: "tutorial",
    name: { ko: "튜토리얼", ja: "チュートリアル" },
    description: { ko: "단계별로 따라가는 실전 가이드", ja: "ステップごとに進む実践ガイド" },
    count: 18,
    color: "#6366f1",
  },
  {
    id: "opinion",
    slug: "opinion",
    name: { ko: "생각", ja: "考え" },
    description: { ko: "기술과 세상에 대한 단상들", ja: "技術と世界への断想" },
    count: 6,
    color: "#64748b",
  },
];
