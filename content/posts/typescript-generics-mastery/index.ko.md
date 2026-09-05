---
title: "TypeScript 제네릭 — 타입을 데이터처럼 다루는 법"
excerpt: "조건부 타입, infer, 분산적 조건부 타입까지 제네릭을 진정으로 활용하는 패턴을 다룹니다."
category: "tech"
tags: ["typescript", "generics", "type-system", "frontend"]
authors: ["anonymous"]
datetime: "2025-07-15T10:00:00+09:00"
draft: false
---

## 제네릭의 기본 개념

제네릭은 타입을 파라미터처럼 전달받아 재사용 가능한 컴포넌트를 만드는 기법입니다. `Array<T>`, `Promise<T>`처럼 표준 라이브러리에서 이미 광범위하게 사용됩니다.

## 타입 제약(Constraints)과 keyof

`extends`를 이용한 타입 제약으로 제네릭의 범위를 좁힐 수 있습니다. `keyof T`는 `T`의 키 유니온 타입을 반환하며, `K extends keyof T`와 조합하면 객체의 특정 프로퍼티에 타입 안전하게 접근하는 함수를 만들 수 있습니다.

## 조건부 타입(Conditional Types)

`T extends U ? X : Y` 형태의 조건부 타입은 타입 레벨에서 if-else를 구현합니다. TypeScript 표준 유틸리티 타입 `Exclude`, `Extract`, `NonNullable`, `ReturnType`이 모두 조건부 타입으로 구현됩니다.

### infer로 타입 추출하기

`infer`는 조건부 타입의 `extends` 절에서만 사용할 수 있는 특별한 키워드입니다. `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never`처럼 함수의 반환 타입을 추론해 추출할 수 있습니다.

## 맵드 타입과 템플릿 리터럴

맵드 타입은 기존 타입의 각 프로퍼티를 변환해 새 타입을 만듭니다. 템플릿 리터럴 타입과 조합하면 이벤트 타입을 자동 생성하는 등 실무에서 다양하게 활용됩니다.

