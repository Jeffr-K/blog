import type { Locale } from "@/shared/i18n/config";

export type PostSection = {
  id: string;
  level: 2 | 3;
  heading: string;
  body: string;
};

export type Post = {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  sections: Record<Locale, PostSection[]>;
};

export const posts: Post[] = [
  {
    id: "1",
    slug: "why-rust-is-worth-learning",
    title: { ko: "Rust를 배워야 하는 이유 — 성능과 안전성의 완벽한 균형", ja: "Rustを学ぶべき理由" },
    excerpt: { ko: "메모리 안전성을 보장하면서도 C/C++ 수준의 성능을 제공하는 Rust. 왜 시스템 프로그래밍의 미래인지 살펴봅니다.", ja: "メモリ安全性を保証しながらC/C++レベルのパフォーマンスを提供するRust。" },
    category: "tech",
    tags: ["rust", "systems", "performance", "memory-safety"],
    date: "2025-08-10",
    readTime: 8,
    sections: { ko: [{ id: "intro", level: 2, heading: "Rust가 주목받는 이유", body: "2006년 Mozilla 직원 Graydon Hoare가 개인 프로젝트로 시작한 Rust는 이제 스택오버플로우 개발자 설문에서 10년 연속 '가장 사랑받는 언어'로 선정되고 있습니다." }], ja: [] },
  },
  {
    id: "2",
    slug: "nextjs-16-new-features",
    title: { ko: "Next.js 16 주요 변경점 완전 분석", ja: "Next.js 16 主要変更点の完全解説" },
    excerpt: { ko: "App Router의 성숙과 함께 찾아온 Next.js 16. 달라진 렌더링 전략, Turbopack 안정화, 새 API들을 정리했습니다.", ja: "App Routerの成熟とともに届いたNext.js 16。" },
    category: "tech",
    tags: ["nextjs", "react", "frontend", "ssr"],
    date: "2025-07-28",
    readTime: 12,
    sections: { ko: [{ id: "overview", level: 2, heading: "Next.js 16 개요", body: "Next.js 16은 App Router가 본격적으로 안정화된 버전입니다." }], ja: [] },
  },
  {
    id: "3",
    slug: "typescript-generics-mastery",
    title: { ko: "TypeScript 제네릭 — 타입을 데이터처럼 다루는 법", ja: "TypeScriptジェネリクス" },
    excerpt: { ko: "조건부 타입, infer, 분산적 조건부 타입까지 제네릭을 진정으로 활용하는 패턴을 다룹니다.", ja: "条件型、infer、分配的条件型まで解説します。" },
    category: "tech",
    tags: ["typescript", "generics", "type-system", "frontend"],
    date: "2025-07-15",
    readTime: 10,
    sections: { ko: [{ id: "basic-generics", level: 2, heading: "제네릭의 기본 개념", body: "제네릭은 타입을 파라미터처럼 전달받아 재사용 가능한 컴포넌트를 만드는 기법입니다." }], ja: [] },
  },
  {
    id: "4",
    slug: "developer-career-growth",
    title: { ko: "개발자 커리어 성장기 — 5년차 소프트웨어 엔지니어의 회고", ja: "エンジニアキャリア成長記" },
    excerpt: { ko: "주니어에서 시니어까지, 기술적 성장보다 더 중요했던 것들에 대한 솔직한 회고입니다.", ja: "ジュニアからシニアまでの正直な振り返りです。" },
    category: "career",
    tags: ["career", "growth", "retrospective", "soft-skills"],
    date: "2025-06-30",
    readTime: 9,
    sections: { ko: [{ id: "beginning", level: 2, heading: "시작 — 코드만 잘 짜면 된다는 착각", body: "첫 직장에서 3개월간 혼자 사이드 프로젝트를 만들었습니다." }], ja: [] },
  },
  {
    id: "5",
    slug: "web-performance-optimization-guide",
    title: { ko: "웹 성능 최적화 — Core Web Vitals 실전 개선 가이드", ja: "Webパフォーマンス最適化ガイド" },
    excerpt: { ko: "LCP, CLS, INP 세 지표를 실제로 개선한 경험 기반의 체계적 접근법을 공유합니다.", ja: "LCP、CLS、INPの3指標を実際に改善した経験を共有します。" },
    category: "tech",
    tags: ["performance", "web-vitals", "frontend", "optimization"],
    date: "2025-06-12",
    readTime: 15,
    sections: { ko: [{ id: "core-web-vitals", level: 2, heading: "Core Web Vitals란", body: "LCP, CLS, INP 세 지표가 구글이 정의하는 핵심 웹 성능 지표입니다." }], ja: [] },
  },
  {
    id: "6",
    slug: "open-source-contribution-guide",
    title: { ko: "오픈소스 기여 시작하기 — 첫 PR을 합병시키는 법", ja: "オープンソース貢献の始め方" },
    excerpt: { ko: "막막하게 느껴지는 오픈소스 기여, 실제로 PR이 합병되기까지의 경험을 공유합니다.", ja: "難しく感じるオープンソース貢献の経験を共有します。" },
    category: "oss",
    tags: ["open-source", "github", "contribution", "community"],
    date: "2025-05-20",
    readTime: 7,
    sections: { ko: [{ id: "why-contribute", level: 2, heading: "왜 오픈소스에 기여해야 할까", body: "오픈소스 기여는 실제 프로덕션 규모의 코드베이스를 경험할 수 있는 최고의 학습 방법입니다." }], ja: [] },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  if (category === "all") return posts;
  return posts.filter((p) => p.category === category);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};
  posts.forEach((p) => p.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
  return Object.entries(counts).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}

export function getCategoryCount(): Record<string, number> {
  const counts: Record<string, number> = { all: posts.length };
  posts.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  return counts;
}
