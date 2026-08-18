import type { Locale } from "@/shared/i18n/config";

export type HotArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
};

const articles: Record<Locale, HotArticle[]> = {
  ko: [
    {
      id: "1",
      slug: "why-rust-is-worth-learning",
      title: "Rust를 배워야 하는 이유 — 성능과 안전성의 완벽한 균형",
      excerpt:
        "메모리 안전성을 보장하면서도 C/C++ 수준의 성능을 제공하는 Rust. 시스템 프로그래밍의 미래가 왜 Rust인지, 그 본질적인 이유를 살펴봅니다.",
      category: "Rust",
      date: "2025-08-10",
      readTime: 8,
    },
    {
      id: "2",
      slug: "nextjs-16-new-features",
      title: "Next.js 16 주요 변경점 완전 분석",
      excerpt:
        "App Router의 성숙과 함께 찾아온 Next.js 16. 달라진 렌더링 전략, Turbopack 안정화, 그리고 개발 경험을 바꾸는 새 API들을 정리했습니다.",
      category: "Next.js",
      date: "2025-07-28",
      readTime: 12,
    },
    {
      id: "3",
      slug: "typescript-generics-mastery",
      title: "TypeScript 제네릭 — 타입을 데이터처럼 다루는 법",
      excerpt:
        "제네릭은 단순한 타입 파라미터가 아닙니다. 조건부 타입, infer, 분산적 조건부 타입까지 제네릭을 진정으로 활용하는 패턴을 다룹니다.",
      category: "TypeScript",
      date: "2025-07-15",
      readTime: 10,
    },
    {
      id: "4",
      slug: "functional-programming-in-practice",
      title: "함수형 프로그래밍 — 부수 효과 없는 코드 설계",
      excerpt:
        "순수 함수, 불변성, 모나드. 이론으로만 알던 함수형 패러다임을 JavaScript/TypeScript 실무에 녹여내는 구체적인 방법을 소개합니다.",
      category: "FP",
      date: "2025-06-30",
      readTime: 9,
    },
    {
      id: "5",
      slug: "web-performance-optimization-guide",
      title: "웹 성능 최적화 — 로딩 0.1초를 줄이는 실전 기법",
      excerpt:
        "LCP, CLS, INP. Core Web Vitals 지표를 실제로 개선한 경험을 바탕으로, 번들 분석부터 렌더링 전략까지 성능 최적화의 전 과정을 공유합니다.",
      category: "Performance",
      date: "2025-06-12",
      readTime: 15,
    },
  ],
  ja: [
    {
      id: "1",
      slug: "why-rust-is-worth-learning",
      title: "Rustを学ぶべき理由 — パフォーマンスと安全性の完璧なバランス",
      excerpt:
        "メモリ安全性を保証しながらC/C++レベルのパフォーマンスを提供するRust。なぜこの言語がシステムプログラミングの未来なのかを掘り下げます。",
      category: "Rust",
      date: "2025-08-10",
      readTime: 8,
    },
    {
      id: "2",
      slug: "nextjs-16-new-features",
      title: "Next.js 16 主要変更点の完全解説",
      excerpt:
        "App Routerの成熟とともに届いたNext.js 16。変わったレンダリング戦略、Turbopackの安定化、開発体験を変える新APIを整理しました。",
      category: "Next.js",
      date: "2025-07-28",
      readTime: 12,
    },
    {
      id: "3",
      slug: "typescript-generics-mastery",
      title: "TypeScriptジェネリクス — 型をデータとして扱う方法",
      excerpt:
        "ジェネリクスは単なる型パラメータではありません。条件型、infer、分配的条件型まで、ジェネリクスを真に活用するパターンを解説します。",
      category: "TypeScript",
      date: "2025-07-15",
      readTime: 10,
    },
    {
      id: "4",
      slug: "functional-programming-in-practice",
      title: "関数型プログラミング — 副作用のないコード設計",
      excerpt:
        "純粋関数、不変性、モナド。理論でしか知らなかった関数型パラダイムをJavaScript/TypeScriptの実務に落とし込む具体的な方法を紹介します。",
      category: "FP",
      date: "2025-06-30",
      readTime: 9,
    },
    {
      id: "5",
      slug: "web-performance-optimization-guide",
      title: "Webパフォーマンス最適化 — 0.1秒を削る実践テクニック",
      excerpt:
        "LCP、CLS、INP。Core Web Vitalsを実際に改善した経験をもとに、バンドル分析からレンダリング戦略まで最適化の全プロセスを共有します。",
      category: "Performance",
      date: "2025-06-12",
      readTime: 15,
    },
  ],
};

export function getHotArticles(locale: Locale): HotArticle[] {
  return articles[locale];
}
