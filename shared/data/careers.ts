import type { Locale } from "@/shared/i18n/config";

export type Job = {
  id: string;
  company: string;
  role: Record<Locale, string>;
  location: Record<Locale, string>;
  language: string[];
  level: Record<Locale, string>;
  levelId: string;
  employment: Record<Locale, string>;
  summary: Record<Locale, string>;
  description: Record<Locale, string>;
  responsibilities: Record<Locale, string[]>;
  requirements: Record<Locale, string[]>;
  benefits: Record<Locale, string[]>;
  process: Record<Locale, string[]>;
  tags: string[];
  deadline: Record<Locale, string>;
};

export type Filter = {
  id: string;
  label: Record<Locale, string>;
  count: number;
};

export const jobs: Job[] = [
  {
    id: "seed-frontend-intern",
    company: "Seed Labs",
    role: { ko: "프론트엔드 인턴", ja: "フロントエンドインターン" },
    location: { ko: "서울", ja: "ソウル" },
    language: ["TypeScript", "React"],
    level: { ko: "인턴", ja: "インターン" },
    levelId: "intern",
    employment: { ko: "인턴", ja: "インターン" },
    summary: {
      ko: "디자인 시스템과 대시보드 UI를 함께 다듬을 주니어 개발자를 찾습니다.",
      ja: "デザインシステムとダッシュボードUIを一緒に磨くジュニア開発者を募集します。",
    },
    description: {
      ko: "Seed Labs는 내부 운영 도구를 빠르게 실험하고 개선하는 작은 제품 팀입니다. 이번 포지션은 컴포넌트 품질, 화면 일관성, 데이터가 많은 대시보드의 사용성을 함께 다룹니다.",
      ja: "Seed Labsは社内運用ツールを素早く試し、改善する小さなプロダクトチームです。このポジションではコンポーネント品質、画面の一貫性、データ量の多いダッシュボードの使いやすさを扱います。",
    },
    responsibilities: {
      ko: ["React 기반 화면 컴포넌트 구현", "디자인 시스템 토큰과 CSS Modules 정리", "폼, 테이블, 필터 UI의 접근성 개선"],
      ja: ["Reactベースの画面コンポーネント実装", "デザインシステムトークンとCSS Modulesの整理", "フォーム、テーブル、フィルターUIのアクセシビリティ改善"],
    },
    requirements: {
      ko: ["TypeScript 기본 문법 이해", "HTML/CSS로 반응형 레이아웃을 구현한 경험", "코드 리뷰 피드백을 반영해 본 경험"],
      ja: ["TypeScriptの基本文法への理解", "HTML/CSSでレスポンシブレイアウトを実装した経験", "コードレビューのフィードバックを反映した経験"],
    },
    benefits: {
      ko: ["주 3일 이상 유연 출근", "멘토링과 코드 리뷰", "개발 장비 지원"],
      ja: ["週3日以上の柔軟な出社", "メンタリングとコードレビュー", "開発機材支援"],
    },
    process: {
      ko: ["서류 검토", "과제 또는 포트폴리오 리뷰", "팀 인터뷰"],
      ja: ["書類確認", "課題またはポートフォリオレビュー", "チーム面談"],
    },
    tags: ["Next.js", "CSS Modules", "UI"],
    deadline: { ko: "상시", ja: "随時" },
  },
  {
    id: "node-backend-junior",
    company: "Orbit Works",
    role: { ko: "백엔드 주니어 개발자", ja: "バックエンドジュニア開発者" },
    location: { ko: "원격", ja: "リモート" },
    language: ["Node.js", "TypeScript"],
    level: { ko: "주니어", ja: "ジュニア" },
    levelId: "junior",
    employment: { ko: "정규직", ja: "正社員" },
    summary: {
      ko: "콘텐츠 API, 검색 인덱싱, RSS 수집 파이프라인을 운영합니다.",
      ja: "コンテンツAPI、検索インデックス、RSS収集パイプラインを運用します。",
    },
    description: {
      ko: "Orbit Works는 콘텐츠와 개발자 도구를 연결하는 백엔드 플랫폼을 운영합니다. 작은 기능을 빠르게 배포하면서도 테스트와 관측 가능성을 함께 챙기는 팀입니다.",
      ja: "Orbit Worksはコンテンツと開発者ツールをつなぐバックエンド基盤を運用しています。小さな機能を素早く出しながら、テストと可観測性も大切にするチームです。",
    },
    responsibilities: {
      ko: ["REST API와 내부 작업 큐 구현", "검색 인덱스 갱신 파이프라인 운영", "CI에서 실행되는 테스트와 린트 보강"],
      ja: ["REST APIと内部ジョブキューの実装", "検索インデックス更新パイプラインの運用", "CIで実行するテストとLintの補強"],
    },
    requirements: {
      ko: ["Node.js로 API를 만들어 본 경험", "SQL 또는 데이터 모델링 기본 이해", "GitHub Actions 등 CI 경험"],
      ja: ["Node.jsでAPIを作った経験", "SQLまたはデータモデリングの基本理解", "GitHub ActionsなどCIの経験"],
    },
    benefits: {
      ko: ["원격 근무", "컨퍼런스/교육비 지원", "운영 자동화 과제 참여"],
      ja: ["リモート勤務", "カンファレンス/学習費支援", "運用自動化への参加"],
    },
    process: {
      ko: ["서류 검토", "기술 인터뷰", "페어링 세션"],
      ja: ["書類確認", "技術面談", "ペアリングセッション"],
    },
    tags: ["API", "PostgreSQL", "CI/CD"],
    deadline: { ko: "09.10 마감", ja: "09.10 締切" },
  },
  {
    id: "rust-cli-trainee",
    company: "Low Level Club",
    role: { ko: "Rust CLI 트레이니", ja: "Rust CLIトレーニー" },
    location: { ko: "부산", ja: "釜山" },
    language: ["Rust"],
    level: { ko: "신입", ja: "新卒" },
    levelId: "entry",
    employment: { ko: "계약직", ja: "契約" },
    summary: {
      ko: "작은 CLI 도구부터 시작해 파일 처리와 네트워크 도구를 만듭니다.",
      ja: "小さなCLIツールから始め、ファイル処理とネットワークツールを作ります。",
    },
    description: {
      ko: "Low Level Club은 시스템 프로그래밍을 배우며 실제 도구를 만드는 팀입니다. 트레이니는 작은 CLI 개선부터 시작해 파일 처리, 네트워크, 릴리즈 자동화를 경험합니다.",
      ja: "Low Level Clubはシステムプログラミングを学びながら実用的なツールを作るチームです。トレーニーは小さなCLI改善から始め、ファイル処理、ネットワーク、リリース自動化を経験します。",
    },
    responsibilities: {
      ko: ["Rust CLI 명령과 옵션 구현", "파일 입출력과 에러 메시지 개선", "릴리즈 노트와 사용 문서 작성"],
      ja: ["Rust CLIコマンドとオプション実装", "ファイルI/Oとエラーメッセージ改善", "リリースノートと利用ドキュメント作成"],
    },
    requirements: {
      ko: ["Rust 기본 문법 학습 경험", "터미널 기반 도구 사용에 익숙함", "작은 오픈소스 이슈를 읽고 재현할 수 있음"],
      ja: ["Rust基本文法の学習経験", "ターミナルベースのツール利用に慣れていること", "小さなOSS Issueを読み再現できること"],
    },
    benefits: {
      ko: ["러스트 학습 시간 보장", "오픈소스 기여 지원", "부산 오피스 선택 근무"],
      ja: ["Rust学習時間の確保", "OSS貢献支援", "釜山オフィス選択勤務"],
    },
    process: {
      ko: ["간단한 사전 질문", "코드 읽기 인터뷰", "팀 합류 논의"],
      ja: ["簡単な事前質問", "コードリーディング面談", "チーム参加の相談"],
    },
    tags: ["Rust", "CLI", "Systems"],
    deadline: { ko: "채용 시 마감", ja: "採用次第終了" },
  },
  {
    id: "frontend-osaka-entry",
    company: "Paper Garden",
    role: { ko: "일본 서비스 프론트엔드 신입", ja: "日本サービス フロントエンド新卒" },
    location: { ko: "오사카", ja: "大阪" },
    language: ["React"],
    level: { ko: "신입", ja: "新卒" },
    levelId: "entry",
    employment: { ko: "정규직", ja: "正社員" },
    summary: {
      ko: "일본어 서비스 화면을 개선하고 접근성 높은 폼 경험을 설계합니다.",
      ja: "日本語サービス画面を改善し、アクセシブルなフォーム体験を設計します。",
    },
    description: {
      ko: "Paper Garden은 일본어 콘텐츠 서비스의 가입, 탐색, 결제 흐름을 개선하고 있습니다. 신입 포지션은 사용자 흐름을 꼼꼼히 읽고 작은 화면 개선을 꾸준히 배포하는 역할입니다.",
      ja: "Paper Gardenは日本語コンテンツサービスの登録、探索、決済フローを改善しています。新卒ポジションではユーザーフローを丁寧に読み、小さな画面改善を継続的に届けます。",
    },
    responsibilities: {
      ko: ["일본어 서비스 화면의 컴포넌트 개선", "폼 유효성 검사와 에러 상태 구현", "접근성과 다국어 QA 체크"],
      ja: ["日本語サービス画面のコンポーネント改善", "フォームバリデーションとエラー状態実装", "アクセシビリティと多言語QAチェック"],
    },
    requirements: {
      ko: ["React 컴포넌트 구현 경험", "일본어 UI 텍스트를 읽고 확인할 수 있음", "접근성 기본 속성에 대한 관심"],
      ja: ["Reactコンポーネント実装経験", "日本語UIテキストを読んで確認できること", "アクセシビリティ基本属性への関心"],
    },
    benefits: {
      ko: ["오사카 하이브리드 근무", "일본어 학습 지원", "제품 QA 참여"],
      ja: ["大阪ハイブリッド勤務", "日本語学習支援", "プロダクトQA参加"],
    },
    process: {
      ko: ["서류 검토", "UI 과제 리뷰", "컬처 인터뷰"],
      ja: ["書類確認", "UI課題レビュー", "カルチャー面談"],
    },
    tags: ["React", "i18n", "Accessibility"],
    deadline: { ko: "09.01 마감", ja: "09.01 締切" },
  },
];

export const languageFilters: Filter[] = [
  { id: "all", label: { ko: "전체 언어", ja: "すべて" }, count: jobs.length },
  { id: "typescript", label: { ko: "TypeScript", ja: "TypeScript" }, count: 2 },
  { id: "react", label: { ko: "React", ja: "React" }, count: 2 },
  { id: "rust", label: { ko: "Rust", ja: "Rust" }, count: 1 },
];

export const levelFilters: Filter[] = [
  { id: "all", label: { ko: "전체 대상", ja: "すべて" }, count: jobs.length },
  { id: "entry", label: { ko: "신입", ja: "新卒" }, count: 2 },
  { id: "junior", label: { ko: "주니어", ja: "ジュニア" }, count: 1 },
  { id: "intern", label: { ko: "인턴", ja: "インターン" }, count: 1 },
];

export function getJob(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}
