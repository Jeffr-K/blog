import { describe, expect, it } from "vitest";

import { clamp, decodeEntities, formatDate } from "../utils";

describe("formatDate", () => {
  it("한국어 날짜 포맷 (YYYY.MM.DD)", () => {
    expect(formatDate("2025-08-15T00:00:00.000Z", "ko")).toBe("2025.08.15");
  });

  it("일본어 날짜 포맷 (YYYY年MM月DD日)", () => {
    expect(formatDate("2025-08-15T00:00:00.000Z", "ja")).toBe("2025年08月15日");
  });

  it("월과 일을 두 자리로 패딩", () => {
    expect(formatDate("2025-01-05T00:00:00.000Z", "ko")).toBe("2025.01.05");
  });
});

describe("decodeEntities", () => {
  it("HTML 엔티티를 디코딩한다", () => {
    expect(decodeEntities("&amp;")).toBe("&");
    expect(decodeEntities("&lt;p&gt;")).toBe("<p>");
    expect(decodeEntities("&quot;hello&quot;")).toBe('"hello"');
  });

  it("숫자 엔티티를 디코딩한다", () => {
    expect(decodeEntities("&#65;")).toBe("A");
  });

  it("엔티티가 없으면 원본 반환", () => {
    expect(decodeEntities("hello world")).toBe("hello world");
  });
});

describe("clamp", () => {
  it("범위 내 값은 그대로", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("최솟값 하한 적용", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("최댓값 상한 적용", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
