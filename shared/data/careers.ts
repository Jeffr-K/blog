import type { Locale } from "@/shared/i18n/config";
import careerData from "../../data/careers.json";

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
  deadlineDate: string | null;
  deadline: Record<Locale, string>;
};

export type Filter = {
  id: string;
  label: Record<Locale, string>;
  count: number;
};

export const jobs = careerData as Job[];

const languageOptions = [
  ["typescript", "TypeScript"],
  ["react", "React"],
  ["rust", "Rust"],
] as const;

export const languageFilters: Filter[] = [
  { id: "all", label: { ko: "전체 언어", ja: "すべて" }, count: jobs.length },
  ...languageOptions.map(([id, label]) => ({
    id,
    label: { ko: label, ja: label },
    count: jobs.filter((job) => job.language.some((item) => item.toLowerCase() === id)).length,
  })),
];

const levelOptions = [
  ["entry", "신입", "新卒"],
  ["junior", "주니어", "ジュニア"],
  ["intern", "인턴", "インターン"],
] as const;

export const levelFilters: Filter[] = [
  { id: "all", label: { ko: "전체 대상", ja: "すべて" }, count: jobs.length },
  ...levelOptions.map(([id, ko, ja]) => ({
    id,
    label: { ko, ja },
    count: jobs.filter((job) => job.levelId === id).length,
  })),
];

export function getJob(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

export function getUrgentJobs(now = Date.now()): Job[] {
  return jobs
    .filter((job) => {
      if (!job.deadlineDate) return false;
      const daysUntilDeadline =
        (new Date(`${job.deadlineDate}T23:59:59`).getTime() - now) / 86400000;
      return daysUntilDeadline >= 0 && daysUntilDeadline <= 7;
    })
    .sort((a, b) => (a.deadlineDate ?? "").localeCompare(b.deadlineDate ?? ""))
    .slice(0, 3);
}
