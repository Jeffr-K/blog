---
title: "TypeScriptジェネリクス — 型をデータとして扱う方法"
excerpt: "条件型、infer、分配的条件型まで、ジェネリクスを真に活用するパターンを解説します。"
category: "tech"
tags: ["typescript", "generics", "type-system", "frontend"]
authors: ["anonymous"]
datetime: "2025-07-15T10:00:00+09:00"
draft: false
---

## ジェネリクスの基本概念

ジェネリクスは型をパラメータとして受け取り、再利用可能なコンポーネントを作る手法です。

## 条件型

`T extends U ? X : Y`形式の条件型は型レベルでif-elseを実装します。

