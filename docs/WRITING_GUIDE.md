# 글쓰기 가이드 — anonymous.rs

## 파일 구조

```
content/
  posts/
    <slug>/
      index.ko.md   ← 한국어 본문
      index.ja.md   ← 일본어 본문 (선택)
```

- `<slug>` : URL에 사용되는 고유 식별자 (영문 소문자, 하이픈)
- 예: `why-rust-is-worth-learning`

---

## Frontmatter

파일 최상단 `---` 사이에 메타데이터를 작성합니다.

```markdown
---
title: "글 제목"
excerpt: "목록 페이지에 표시되는 요약 (1-2문장)"
category: "tech"
tags: ["rust", "systems", "performance"]
authors: ["anonymous"]
datetime: "2025-08-10T10:00:00+09:00"
draft: false
---
```

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | string | ✓ | 글 제목 |
| `excerpt` | string | ✓ | 목록 요약 (140자 이내 권장) |
| `category` | string | ✓ | 카테고리 ID |
| `tags` | string[] | ✓ | 태그 목록 |
| `authors` | string[] | ✓ | 작성자 목록 |
| `datetime` | ISO 8601 | ✓ | 발행 일시 (`2025-08-10T10:00:00+09:00`) |
| `draft` | boolean | | `true`면 목록에서 숨김 (기본값: `false`) |
| `copyright` | string | | 저작권 문구 오버라이드. 생략 시 `© 2026 anonymous.rs` |

`authors`에는 표시 이름이 아니라 작성자 ID를 넣습니다. 작성자 ID와 표시 이름은 `shared/data/authors.ts`에서 관리합니다.

### 카테고리 목록

| ID | 이름 |
|----|------|
| `tech` | 기술 |
| `career` | 커리어 |
| `news` | 소식 |
| `life` | 일상 |
| `review` | 리뷰 |
| `essay` | 에세이 |
| `oss` | 오픈소스 |
| `tutorial` | 튜토리얼 |
| `opinion` | 생각 |

---

## 마크다운 문법

### 헤딩

```markdown
## 섹션 제목 (h2) — 하단 구분선, 목차에 포함
### 소제목 (h3) — 좌측 퍼플 보더, 목차에 포함 (들여쓰기)
#### 세부 항목 (h4)
```

> `#` (h1)은 frontmatter의 `title`이 자동으로 렌더링하므로 본문에서 사용하지 않습니다.

---

### 텍스트 강조

```markdown
**굵게** — 강조
*기울임* — 보조 설명, 외래어
~~취소선~~ — 수정된 내용
`인라인 코드` — 변수명, 함수명, 파일명
```

렌더링 결과: **굵게** / *기울임* / ~~취소선~~ / `인라인 코드`

---

### 링크

```markdown
[표시 텍스트](https://example.com)
[내부 링크](/ko/posts/other-slug)
```

외부 링크는 자동으로 새 탭에서 열립니다.

---

### 코드 블록

언어 식별자를 반드시 명시합니다.

````markdown
```rust
fn main() {
    println!("Hello, world!");
}
```
````

**지원 언어**: `rust`, `typescript`, `javascript`, `python`, `go`, `bash`, `toml`, `yaml`, `json`, `sql`, `html`, `css`, `markdown`

#### 파일명 표시

````markdown
```typescript
// index.ts
export function hello() {
  return "world";
}
```
````

#### 줄 강조

````markdown
```rust {2,4}
fn main() {
    let x = 5;        // 이 줄이 강조됩니다
    let y = 10;
    println!("{}", x + y); // 이 줄도 강조됩니다
}
```
````

---

### 인용문 (Blockquote)

```markdown
> 인용할 내용을 여기 씁니다.
> 여러 줄도 가능합니다.

> **Note:** `>` 뒤에 `**굵게**`를 쓰면 퍼플 강조로 표시됩니다.
```

### 콜아웃 (Callout / Admonition)

```markdown
> [!note]
> 일반적인 보충 설명입니다.

> [!info]
> 독자가 알아두면 좋은 정보입니다.

> [!tip]
> 바로 적용할 수 있는 팁입니다.

> [!warning]
> 주의가 필요한 내용입니다.

> [!danger]
> 강하게 경고해야 하는 내용입니다.
```

콜아웃 종류, 라벨, 색상은 `shared/components/mdx/callouts/config.ts`에서 관리합니다.

---

### 목록

```markdown
- 순서 없는 목록 (퍼플 불릿)
- 두 번째 항목
  - 중첩 항목

1. 순서 있는 목록 (퍼플 번호)
2. 두 번째 항목
3. 세 번째 항목
```

---

### 표 (Table)

```markdown
| 컬럼 1 | 컬럼 2 | 컬럼 3 |
|--------|--------|--------|
| 값 1   | 값 2   | 값 3   |
| 값 4   | 값 5   | 값 6   |
```

---

### 이미지

```markdown
![이미지 설명 (캡션으로 표시됨)](/images/example.png)
```

이미지 파일은 `public/images/` 에 저장합니다.

---

### 수평선

```markdown
---
```

섹션 사이를 구분할 때 사용합니다. 전후로 빈 줄을 추가하세요.

---

## 작성 팁

### 제목 계층
- `##` 은 주요 섹션 (3-6개 권장)
- `###` 은 소섹션 (각 `##` 아래 1-3개)
- 목차(TOC)는 `##`과 `###`만 포함됩니다

### 코드 예시
- 코드 블록에는 반드시 언어를 명시
- 실제로 동작하는 코드만 포함
- 중요한 줄은 줄 강조 기능 활용

### 글 길이
- 읽기 시간 5-15분 권장
- `readTime`은 자동 계산 (분당 약 200단어 기준)

---

## 초안(Draft) 관리

```markdown
---
draft: true   ← 개발 서버에서만 보임, 빌드 시 제외
---
```

작성 중인 글은 `draft: true`로 설정하고 완성되면 `false`로 변경합니다.
