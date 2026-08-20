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
    title: {
      ko: "Rust를 배워야 하는 이유 — 성능과 안전성의 완벽한 균형",
      ja: "Rustを学ぶべき理由 — パフォーマンスと安全性の完璧なバランス",
    },
    excerpt: {
      ko: "메모리 안전성을 보장하면서도 C/C++ 수준의 성능을 제공하는 Rust. 왜 시스템 프로그래밍의 미래인지 살펴봅니다.",
      ja: "メモリ安全性を保証しながらC/C++レベルのパフォーマンスを提供するRust。",
    },
    category: "tech",
    tags: ["rust", "systems", "performance", "memory-safety"],
    date: "2025-08-10",
    readTime: 8,
    sections: {
      ko: [
        {
          id: "intro",
          level: 2,
          heading: "Rust가 주목받는 이유",
          body: "2006년 Mozilla 직원 Graydon Hoare가 개인 프로젝트로 시작한 Rust는 이제 스택오버플로우 개발자 설문에서 10년 연속 '가장 사랑받는 언어'로 선정되고 있습니다. 구글, 마이크로소프트, 아마존 같은 빅테크 기업들이 코어 시스템에 도입하고 있으며, 리눅스 커널에도 C와 함께 공식 언어로 채택됐습니다.",
        },
        {
          id: "ownership",
          level: 2,
          heading: "소유권 시스템 — 컴파일 타임 메모리 안전성",
          body: "Rust의 핵심은 소유권(Ownership) 시스템입니다. 메모리 할당과 해제가 컴파일 타임에 결정되어 가비지 컬렉터 없이도 메모리 누수와 댕글링 포인터를 원천 차단합니다. 변수는 단 하나의 '소유자'만 가질 수 있고, 소유자가 스코프를 벗어나면 메모리가 자동으로 해제됩니다.",
        },
        {
          id: "borrow-checker",
          level: 3,
          heading: "빌림 검사기(Borrow Checker)",
          body: "소유권을 '빌려오는' 참조자(Reference)는 읽기 전용 참조는 여러 개, 쓰기 가능한 참조는 오직 하나만 동시에 존재할 수 있습니다. 이 규칙이 데이터 레이스를 컴파일 단계에서 완전히 제거합니다. 처음에는 빌림 검사기와 씨름하게 되지만, 이 제약이 결국 안전한 동시성 코드를 강제합니다.",
        },
        {
          id: "performance",
          level: 2,
          heading: "C/C++ 수준의 성능",
          body: "Rust는 제로 비용 추상화(Zero-cost Abstraction)를 표방합니다. 고수준 언어의 편의 기능을 사용하더라도 런타임 오버헤드가 없습니다. 이터레이터, 클로저, 제네릭 모두 컴파일 시 인라이닝되어 직접 작성한 C 코드와 동등한 어셈블리가 생성됩니다.",
        },
        {
          id: "ecosystem",
          level: 2,
          heading: "성숙해가는 생태계",
          body: "Cargo라는 공식 패키지 매니저와 빌드 시스템이 있어 의존성 관리가 편리합니다. crates.io에는 10만 개 이상의 크레이트(라이브러리)가 등록되어 있습니다. 비동기 런타임 Tokio, 웹 프레임워크 Axum, 직렬화 라이브러리 Serde 등이 이미 충분히 성숙했습니다.",
        },
        {
          id: "when-to-use",
          level: 2,
          heading: "언제 Rust를 선택해야 할까",
          body: "성능이 중요한 CLI 도구, 시스템 프로그래밍, WebAssembly, 임베디드, 네트워크 서버에서 탁월합니다. Rust는 진입 장벽이 있지만 그 투자는 분명히 회수됩니다.",
        },
      ],
      ja: [
        { id: "intro", level: 2, heading: "Rustが注目される理由", body: "2006年にMozillaのGraydon Howareが個人プロジェクトとして始めたRustは、今やStack Overflow開発者調査で10年連続最も愛されている言語に選ばれています。" },
        { id: "ownership", level: 2, heading: "所有権システム", body: "Rustの核心は所有権(Ownership)システムです。メモリの割り当てと解放がコンパイル時に決定されます。" },
        { id: "performance", level: 2, heading: "C/C++レベルのパフォーマンス", body: "Rustはゼロコスト抽象化を掲げています。高レベルの機能を使ってもランタイムオーバーヘッドがありません。" },
      ],
    },
  },
  {
    id: "2",
    slug: "nextjs-16-new-features",
    title: {
      ko: "Next.js 16 주요 변경점 완전 분석",
      ja: "Next.js 16 主要変更点の完全解説",
    },
    excerpt: {
      ko: "App Router의 성숙과 함께 찾아온 Next.js 16. 달라진 렌더링 전략, Turbopack 안정화, 새 API들을 정리했습니다.",
      ja: "App Routerの成熟とともに届いたNext.js 16。変わったレンダリング戦略、Turbopackの安定化を整理しました。",
    },
    category: "tech",
    tags: ["nextjs", "react", "frontend", "ssr"],
    date: "2025-07-28",
    readTime: 12,
    sections: {
      ko: [
        { id: "overview", level: 2, heading: "Next.js 16 개요", body: "Next.js 16은 App Router가 본격적으로 안정화된 버전입니다. Pages Router와의 호환성은 유지하면서 서버 컴포넌트와 클라이언트 컴포넌트의 경계가 더욱 명확해졌습니다." },
        { id: "turbopack", level: 2, heading: "Turbopack 안정화", body: "Webpack을 대체하는 Turbopack이 프로덕션 빌드에서도 안정적으로 사용 가능해졌습니다. 벤치마크에 따르면 콜드 스타트 76%, HMR 96% 빠른 속도를 보여줍니다." },
        { id: "rendering", level: 2, heading: "렌더링 전략 변화", body: "Partial Prerendering(PPR)이 실험적 기능에서 점진적으로 안정화되었습니다. 하나의 라우트에서 정적 셸과 동적 스트리밍 콘텐츠를 혼합할 수 있어 TTFB를 최소화하면서도 개인화 콘텐츠를 제공할 수 있게 됩니다." },
        { id: "server-actions", level: 2, heading: "Server Actions 개선", body: "Server Actions가 폼 외부에서도 자연스럽게 호출할 수 있도록 개선됐습니다. 낙관적 업데이트와 함께 사용하면 클라이언트 상태 관리 라이브러리 없이도 부드러운 UX를 구현할 수 있습니다." },
        { id: "migration", level: 2, heading: "Pages Router에서 마이그레이션", body: "두 라우팅 시스템이 공존할 수 있어 리스크를 최소화하며 전환 가능합니다. getServerSideProps, getStaticProps 패턴을 서버 컴포넌트와 fetch로 대체하는 것이 핵심입니다." },
      ],
      ja: [
        { id: "overview", level: 2, heading: "Next.js 16 概要", body: "Next.js 16はApp Routerが本格的に安定化されたバージョンです。" },
        { id: "turbopack", level: 2, heading: "Turbopackの安定化", body: "Webpackを置き換えるTurbopackがプロダクションビルドでも安定して使えるようになりました。" },
      ],
    },
  },
  {
    id: "3",
    slug: "typescript-generics-mastery",
    title: {
      ko: "TypeScript 제네릭 — 타입을 데이터처럼 다루는 법",
      ja: "TypeScriptジェネリクス — 型をデータとして扱う方法",
    },
    excerpt: {
      ko: "조건부 타입, infer, 분산적 조건부 타입까지 제네릭을 진정으로 활용하는 패턴을 다룹니다.",
      ja: "条件型、infer、分配的条件型まで、ジェネリクスを真に活用するパターンを解説します。",
    },
    category: "tech",
    tags: ["typescript", "generics", "type-system", "frontend"],
    date: "2025-07-15",
    readTime: 10,
    sections: {
      ko: [
        { id: "basic-generics", level: 2, heading: "제네릭의 기본 개념", body: "제네릭은 타입을 파라미터처럼 전달받아 재사용 가능한 컴포넌트를 만드는 기법입니다. Array<T>, Promise<T>처럼 표준 라이브러리에서 이미 광범위하게 사용됩니다." },
        { id: "constraints", level: 2, heading: "타입 제약(Constraints)과 keyof", body: "extends를 이용한 타입 제약으로 제네릭의 범위를 좁힐 수 있습니다. keyof T는 T의 키 유니온 타입을 반환하며, K extends keyof T와 조합하면 객체의 특정 프로퍼티에 타입 안전하게 접근하는 함수를 만들 수 있습니다." },
        { id: "conditional-types", level: 2, heading: "조건부 타입(Conditional Types)", body: "T extends U ? X : Y 형태의 조건부 타입은 타입 레벨에서 if-else를 구현합니다. TypeScript 표준 유틸리티 타입 Exclude, Extract, NonNullable, ReturnType이 모두 조건부 타입으로 구현됩니다." },
        { id: "infer", level: 3, heading: "infer로 타입 추출하기", body: "infer는 조건부 타입의 extends 절에서만 사용할 수 있는 특별한 키워드입니다. type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never처럼 함수의 반환 타입을 추론해 추출할 수 있습니다." },
        { id: "mapped-types", level: 2, heading: "맵드 타입과 템플릿 리터럴", body: "맵드 타입은 기존 타입의 각 프로퍼티를 변환해 새 타입을 만듭니다. 템플릿 리터럴 타입과 조합하면 이벤트 타입을 자동 생성하는 등 실무에서 다양하게 활용됩니다." },
      ],
      ja: [
        { id: "basic-generics", level: 2, heading: "ジェネリクスの基本概念", body: "ジェネリクスは型をパラメータとして受け取り、再利用可能なコンポーネントを作る手法です。" },
        { id: "conditional-types", level: 2, heading: "条件型", body: "T extends U ? X : Y形式の条件型は型レベルでif-elseを実装します。" },
      ],
    },
  },
  {
    id: "4",
    slug: "developer-career-growth",
    title: {
      ko: "개발자 커리어 성장기 — 5년차 소프트웨어 엔지니어의 회고",
      ja: "エンジニアキャリア成長記 — 5年目の振り返り",
    },
    excerpt: {
      ko: "주니어에서 시니어까지, 기술적 성장보다 더 중요했던 것들에 대한 솔직한 회고입니다.",
      ja: "ジュニアからシニアまで、技術的成長よりも大切だったことへの正直な振り返りです。",
    },
    category: "career",
    tags: ["career", "growth", "retrospective", "soft-skills"],
    date: "2025-06-30",
    readTime: 9,
    sections: {
      ko: [
        { id: "beginning", level: 2, heading: "시작 — 코드만 잘 짜면 된다는 착각", body: "첫 직장에서 3개월간 혼자 사이드 프로젝트를 만들었습니다. 기술적으로는 나름 완성도 있었지만, 이걸 팀에 설명하고 설득하는 능력이 전혀 없었습니다." },
        { id: "communication", level: 2, heading: "커뮤니케이션이 기술보다 앞선다", body: "3년차에 접어들면서 기술적으로 나보다 뛰어나지 않은 동료가 더 큰 영향력을 가진다는 사실에 충격받았습니다. 문서를 잘 쓰고, 이해관계자들과 신뢰를 쌓는 능력이 차이였습니다." },
        { id: "specialization", level: 2, heading: "T자형 성장 전략", body: "넓게 알고 깊게 파는 T자형 역량이 실제로 동작합니다. 핵심 전문성 하나와 인접 기술의 기초 이해를 동시에 쌓아가세요." },
        { id: "ownership", level: 2, heading: "오너십 — 내 이름을 걸고", body: "시니어와 주니어의 가장 큰 차이는 오너십입니다. '지시받은 대로 구현'에서 '문제를 발견하고 해결책을 제안'으로 마인드가 바뀌면서 성장이 가속됐습니다." },
        { id: "learning", level: 2, heading: "지속적 학습의 방법론", body: "매일 30분 독서, 주 1회 사이드 프로젝트, 분기 1회 컨퍼런스 참여를 5년 동안 유지했습니다. 글로 설명할 수 없으면 아직 제대로 이해한 것이 아닙니다." },
      ],
      ja: [
        { id: "beginning", level: 2, heading: "始まり", body: "最初の職場で3ヶ月間、一人でサイドプロジェクトを作りました。" },
        { id: "ownership", level: 2, heading: "オーナーシップ", body: "シニアとジュニアの最大の違いはオーナーシップです。" },
      ],
    },
  },
  {
    id: "5",
    slug: "web-performance-optimization-guide",
    title: {
      ko: "웹 성능 최적화 — Core Web Vitals 실전 개선 가이드",
      ja: "Webパフォーマンス最適化 — Core Web Vitals実践改善ガイド",
    },
    excerpt: {
      ko: "LCP, CLS, INP 세 지표를 실제로 개선한 경험 기반의 체계적 접근법을 공유합니다.",
      ja: "LCP、CLS、INPの3指標を実際に改善した経験に基づく体系的なアプローチを共有します。",
    },
    category: "tech",
    tags: ["performance", "web-vitals", "frontend", "optimization"],
    date: "2025-06-12",
    readTime: 15,
    sections: {
      ko: [
        { id: "core-web-vitals", level: 2, heading: "Core Web Vitals란", body: "LCP, CLS, INP 세 지표가 구글이 정의하는 핵심 웹 성능 지표입니다. 좋음 기준: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms." },
        { id: "lcp", level: 2, heading: "LCP 개선 — 가장 큰 콘텐츠를 빠르게", body: "LCP는 뷰포트에서 가장 큰 콘텐츠 요소가 렌더링되는 시간입니다. fetchpriority=\"high\" 속성과 link rel=\"preload\" 조합으로 즉각적인 개선이 가능합니다." },
        { id: "cls", level: 2, heading: "CLS 개선 — 레이아웃 이동 없애기", body: "CLS는 페이지 로드 중 예상치 못한 레이아웃 이동의 누적 점수입니다. 이미지와 영상에 width/height를 명시하거나 aspect-ratio CSS를 적용하면 대부분 해결됩니다." },
        { id: "inp", level: 2, heading: "INP 개선 — 반응성 높이기", body: "INP는 2024년 FID를 대체한 새 지표로, 모든 사용자 인터랙션의 응답 지연을 측정합니다. JavaScript 번들 분할, 무거운 연산을 Web Worker로 오프로드하는 것이 효과적입니다." },
        { id: "measurement", level: 2, heading: "측정 도구와 워크플로우", body: "Lighthouse(로컬), PageSpeed Insights(실 사용자 데이터), Chrome DevTools Performance 탭을 상황에 맞게 조합합니다. 배포 파이프라인에 Lighthouse CI를 통합하면 성능 회귀를 자동으로 검출할 수 있습니다." },
        { id: "resource-hints", level: 3, heading: "리소스 힌트 활용", body: "preconnect, dns-prefetch, preload는 브라우저에게 리소스 로딩 우선순위를 지시합니다. 과도한 preload는 오히려 성능을 저하시킬 수 있으니, 실제 측정을 통해 크리티컬 리소스에만 적용하세요." },
      ],
      ja: [
        { id: "core-web-vitals", level: 2, heading: "Core Web Vitalsとは", body: "LCP、CLS、INPの3指標がGoogleが定義するコアWebパフォーマンス指標です。" },
        { id: "lcp", level: 2, heading: "LCPの改善", body: "LCPはビューポート内で最大のコンテンツ要素がレンダリングされる時間です。" },
      ],
    },
  },
  {
    id: "6",
    slug: "open-source-contribution-guide",
    title: {
      ko: "오픈소스 기여 시작하기 — 첫 PR을 합병시키는 법",
      ja: "オープンソース貢献の始め方 — 初めてのPRをマージさせる方法",
    },
    excerpt: {
      ko: "막막하게 느껴지는 오픈소스 기여, 실제로 PR이 합병되기까지의 경험을 공유합니다.",
      ja: "難しく感じるオープンソース貢献。実際にPRがマージされるまでの経験を共有します。",
    },
    category: "oss",
    tags: ["open-source", "github", "contribution", "community"],
    date: "2025-05-20",
    readTime: 7,
    sections: {
      ko: [
        { id: "why-contribute", level: 2, heading: "왜 오픈소스에 기여해야 할까", body: "오픈소스 기여는 실제 프로덕션 규모의 코드베이스를 경험할 수 있는 최고의 학습 방법입니다. 세계적인 개발자들로부터 직접 피드백을 받을 수 있습니다." },
        { id: "finding-project", level: 2, heading: "기여할 프로젝트 찾기", body: "첫 기여는 이미 사용 중인 라이브러리나 도구에서 시작하세요. GitHub의 good first issue, help wanted 레이블로 필터링하면 초보자에게 적합한 이슈를 찾을 수 있습니다." },
        { id: "pr-process", level: 2, heading: "PR 합병까지의 실제 과정", body: "이슈를 먼저 열어 변경 방향을 논의하는 것이 중요합니다. 대형 PR보다 작고 집중된 PR이 리뷰어의 부담을 줄이고 합병 확률을 높입니다." },
        { id: "communication", level: 2, heading: "메인테이너와 소통하기", body: "PR 설명에 변경 이유, 구현 방법, 테스트 방법을 명확히 작성하세요. 응답이 없어도 조급해하지 마세요. 메인테이너들은 대부분 자원봉사자입니다." },
        { id: "after-merge", level: 2, heading: "첫 PR 합병 이후", body: "첫 번째 PR이 합병되면 자신감이 붙고 두 번째부터는 훨씬 쉬워집니다. 커뮤니티와의 신뢰가 쌓이면 결국 메인테이너가 되는 기회도 찾아옵니다." },
      ],
      ja: [
        { id: "why-contribute", level: 2, heading: "なぜオープンソースに貢献すべきか", body: "オープンソース貢献は実際のプロダクションスケールのコードベースを経験できる最良の学習方法です。" },
        { id: "pr-process", level: 2, heading: "PRマージまでの実際のプロセス", body: "まずissueを開いて変更の方向性を議論することが重要です。" },
      ],
    },
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
