---
title: "웹 성능 최적화 — Core Web Vitals 실전 개선 가이드"
excerpt: "LCP, CLS, INP 세 지표를 실제로 개선한 경험 기반의 체계적 접근법을 공유합니다."
category: "tech"
tags: ["performance", "web-vitals", "frontend", "optimization"]
authors: ["anonymous"]
datetime: "2025-06-12T10:00:00+09:00"
draft: false
---

## Core Web Vitals란

LCP, CLS, INP 세 지표가 구글이 정의하는 핵심 웹 성능 지표입니다. 좋음 기준은 LCP 2.5초 이하, CLS 0.1 이하, INP 200ms 이하입니다.

## LCP 개선 — 가장 큰 콘텐츠를 빠르게

LCP는 뷰포트에서 가장 큰 콘텐츠 요소가 렌더링되는 시간입니다. `fetchpriority="high"` 속성과 `link rel="preload"` 조합으로 즉각적인 개선이 가능합니다.

## CLS 개선 — 레이아웃 이동 없애기

CLS는 페이지 로드 중 예상치 못한 레이아웃 이동의 누적 점수입니다. 이미지와 영상에 `width`와 `height`를 명시하거나 `aspect-ratio` CSS를 적용하면 대부분 해결됩니다.

## INP 개선 — 반응성 높이기

INP는 2024년 FID를 대체한 새 지표로, 모든 사용자 인터랙션의 응답 지연을 측정합니다. JavaScript 번들 분할, 무거운 연산을 Web Worker로 오프로드하는 것이 효과적입니다.

## 측정 도구와 워크플로우

Lighthouse(로컬), PageSpeed Insights(실 사용자 데이터), Chrome DevTools Performance 탭을 상황에 맞게 조합합니다. 배포 파이프라인에 Lighthouse CI를 통합하면 성능 회귀를 자동으로 검출할 수 있습니다.

### 리소스 힌트 활용

`preconnect`, `dns-prefetch`, `preload`는 브라우저에게 리소스 로딩 우선순위를 지시합니다. 과도한 preload는 오히려 성능을 저하시킬 수 있으니, 실제 측정을 통해 크리티컬 리소스에만 적용하세요.

