import Link from "next/link";
import { notFound } from "next/navigation";

import type { Locale } from "@/shared/i18n/config";
import { isLocale } from "@/shared/i18n/config";
import { jobs, languageFilters, levelFilters, type Filter } from "@/shared/data/careers";

import styles from "./careers.module.css";

const copy = {
  ko: {
    eyebrow: "Newcomer Jobs",
    title: "개발자를 위한 채용 보드",
    intro:
      "익명이 블로그를 방문한 사람들이 개발자에게 맞는 채용 공고를 공유하는 공간입니다.",
    add: "채용+",
    addTitle: "채용 공고 등록",
    addBody:
      "신입 또는 주니어에게 열려 있는 포지션을 보내주세요. 검토 후 블로그 채용 보드에 게시합니다.",
    addCta: "메일로 등록",
    filters: "언어",
    audience: "대상",
    sidebarHint: "필터",
    rightDeadline: "마감 임박",
    rightGuide: "등록 가이드",
    rightGuideBody: "신입/주니어에게 열려 있는 포지션, 지원 링크, 마감일을 함께 보내주세요.",
    rightSearch: "추천 검색",
    searchTitle: "복합 검색",
    keyword: "검색어",
    location: "지역",
    role: "직무",
    allLocations: "전체 지역",
    allRoles: "전체 직무",
    list: "채용 목록",
    countUnit: "개",
    deadline: "마감",
    empty: "조건에 맞는 채용 공고가 없습니다.",
    detail: "문의",
    contactEmail: "careers@anonymous.rs",
  },
  ja: {
    eyebrow: "Newcomer Jobs",
    title: "開発者のための求人ボード",
    intro:
      "anonymous.rsを訪れた人たちが、開発者向けの求人を共有する場所です。",
    add: "求人+",
    addTitle: "求人を掲載",
    addBody:
      "新卒またはジュニアに開かれたポジションを送ってください。確認後、求人ボードに掲載します。",
    addCta: "メールで掲載",
    filters: "言語",
    audience: "対象",
    sidebarHint: "フィルター",
    rightDeadline: "締切間近",
    rightGuide: "掲載ガイド",
    rightGuideBody: "新卒・ジュニアに開かれたポジション、応募リンク、締切日を添えて送ってください。",
    rightSearch: "おすすめ検索",
    searchTitle: "複合検索",
    keyword: "検索語",
    location: "地域",
    role: "職務",
    allLocations: "すべての地域",
    allRoles: "すべての職務",
    list: "求人一覧",
    countUnit: "件",
    deadline: "締切",
    empty: "条件に合う求人がありません。",
    detail: "問い合わせ",
    contactEmail: "careers@anonymous.rs",
  },
} satisfies Record<Locale, Record<string, string>>;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    lang?: string;
    q?: string;
    location?: string;
    role?: string;
    skill?: string;
    level?: string;
  }>;
};

export default async function CareersPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;

  if (!isLocale(locale)) notFound();

  const t = copy[locale];
  const activeLang = query.lang ?? "all";
  const activeLevel = query.level ?? "all";
  const q = query.q?.trim().toLowerCase() ?? "";
  const location = query.location ?? "all";
  const role = query.role ?? "all";
  const skill = query.skill ?? "all";
  const locations = Array.from(new Set(jobs.map((job) => job.location.ko)));
  const roles = ["프론트엔드", "백엔드", "Rust"];
  const skills = Array.from(new Set(jobs.flatMap((job) => [...job.language, ...job.tags])));

  const filtered = jobs.filter((job) => {
    const matchesLang =
      activeLang === "all" ||
      job.language.some((lang) => lang.toLowerCase() === activeLang);
    const matchesLevel = activeLevel === "all" || job.levelId === activeLevel;
    const searchable = [
      job.company,
      job.role[locale],
      job.location[locale],
      job.summary[locale],
      ...job.language,
      ...job.tags,
    ].join(" ").toLowerCase();
    const matchesQuery = !q || searchable.includes(q);
    const matchesLocation = location === "all" || job.location.ko === location;
    const matchesRole = role === "all" || job.role.ko.includes(role);
    const matchesSkill =
      skill === "all" ||
      [...job.language, ...job.tags].some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      );

    return matchesLang && matchesLevel && matchesQuery && matchesLocation && matchesRole && matchesSkill;
  });

  const urgentJobs = jobs
    .filter((job) => job.deadline.ko.includes("09."))
    .slice(0, 3);
  const suggestedSearches = [
    { label: "React", href: buildHref(locale, { skill: "React" }) },
    { label: locale === "ko" ? "원격" : "リモート", href: buildHref(locale, { location: "원격" }) },
    { label: "Rust", href: buildHref(locale, { skill: "Rust" }) },
  ];

  return (
    <main className="site-main">
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <section className={styles.banner}>
            <div>
              <span className={styles.eyebrow}>{t.eyebrow}</span>
              <h1 className={styles.title}>{t.title}</h1>
              <p className={styles.intro}>{t.intro}</p>
            </div>
            <Link href="#post-job" className={styles.addButton}>
              {t.add}
            </Link>
          </section>

          <aside className={styles.left}>
            <nav className={styles.filterNav} aria-label={t.audience}>
              <p className={styles.sideIntro}>{t.sidebarHint}</p>
              <FilterGroup
                title={t.audience}
                filters={levelFilters}
                active={activeLevel}
                paramName="level"
                query={query}
                locale={locale}
              />
              <FilterGroup
                title={t.filters}
                filters={languageFilters}
                active={activeLang}
                paramName="lang"
                query={query}
                locale={locale}
              />
            </nav>
          </aside>

          <div className={styles.center}>
            <form className={styles.searchBox}>
              {activeLang !== "all" && <input type="hidden" name="lang" value={activeLang} />}
              <p className={styles.searchHeading}>{t.searchTitle}</p>
              <div className={styles.searchStack}>
                <div className={styles.filterGrid}>
                  <label className={styles.field}>
                    <span>{t.location}</span>
                    <select name="location" defaultValue={location}>
                      <option value="all">{t.allLocations}</option>
                      {locations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>{t.role}</span>
                    <select name="role" defaultValue={role}>
                      <option value="all">{t.allRoles}</option>
                      {roles.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Skill</span>
                    <select name="skill" defaultValue={skill}>
                      <option value="all">All skills</option>
                      {skills.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="submit" className={styles.searchButton}>
                    Search
                  </button>
                </div>
                <label className={styles.field}>
                  <span>{t.keyword}</span>
                  <input name="q" defaultValue={query.q ?? ""} placeholder="Next.js, Rust, API" />
                </label>
              </div>
            </form>

            <section className={styles.section} aria-labelledby="job-list">
              <div className={styles.sectionHeader}>
                <h2 id="job-list" className={styles.sectionTitle}>
                  {t.list}
                </h2>
                <span className={styles.count}>
                  {filtered.length}
                  {t.countUnit}
                </span>
              </div>

              {filtered.length === 0 ? (
                <div className={styles.empty}>{t.empty}</div>
              ) : (
                <div className={styles.jobs}>
                  {filtered.map((job) => (
                    <article key={job.id} className={styles.job}>
                      <div className={styles.jobMain}>
                        <div className={styles.jobMeta}>
                          <span>{job.company}</span>
                          <span className={styles.dot} aria-hidden="true" />
                          <span>{job.level[locale]}</span>
                          <span className={styles.dot} aria-hidden="true" />
                          <span>{job.location[locale]}</span>
                          <span className={styles.dot} aria-hidden="true" />
                          <span>{job.employment[locale]}</span>
                        </div>
                        <h3 className={styles.role}>
                          <Link
                            href={`/${locale}/careers/${job.id}`}
                            className={styles.roleLink}
                          >
                            {job.role[locale]}
                          </Link>
                        </h3>
                        <p className={styles.summary}>{job.summary[locale]}</p>
                        <div className={styles.tags}>
                          {Array.from(new Set([...job.language, ...job.tags])).map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.jobSide}>
                        <span className={styles.deadlineLabel}>{t.deadline}</span>
                        <span className={styles.deadline}>{job.deadline[locale]}</span>
                      <a
                        className={styles.detailLink}
                        href={`mailto:${t.contactEmail}?subject=${encodeURIComponent(`[채용 문의] ${job.company} ${job.role[locale]}`)}`}
                      >
                          {t.detail}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section id="post-job" className={styles.postJob}>
              <div>
                <h2 className={styles.postTitle}>{t.addTitle}</h2>
                <p className={styles.postBody}>{t.addBody}</p>
              </div>
              <a
                className={styles.emailLink}
                href={`mailto:${t.contactEmail}?subject=${encodeURIComponent("[채용 등록] 신입/주니어 포지션")}`}
              >
                {t.addCta}
              </a>
            </section>
          </div>

          <aside className={styles.right}>
            <div className={styles.rightSidebar}>
              <section className={styles.sideSection}>
                <p className={styles.sideHeading}>{t.rightDeadline}</p>
                <ul className={styles.compactList}>
                  {urgentJobs.map((job) => (
                    <li key={job.id}>
                      <a
                        className={styles.compactItem}
                        href={`mailto:${t.contactEmail}?subject=${encodeURIComponent(`[채용 문의] ${job.company} ${job.role[locale]}`)}`}
                      >
                        <span className={styles.urgentDot} aria-hidden="true" />
                        <span className={styles.compactTitle}>{job.role[locale]}</span>
                        <span className={styles.compactMeta}>{job.deadline[locale]}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.sideSection}>
                <p className={styles.sideHeading}>{t.rightSearch}</p>
                <div className={styles.quickLinks}>
                  {suggestedSearches.map((item) => (
                    <Link key={item.label} href={item.href} className={styles.quickLink}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>

              <section className={styles.sideSection}>
                <p className={styles.sideHeading}>{t.rightGuide}</p>
                <p className={styles.guideText}>{t.rightGuideBody}</p>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function FilterGroup({
  title,
  filters,
  active,
  paramName,
  query,
  locale,
}: {
  title: string;
  filters: Filter[];
  active: string;
  paramName: "level" | "lang";
  query: Record<string, string | undefined>;
  locale: Locale;
}) {
  return (
    <section className={styles.filterGroup}>
      <p className={styles.sideHeading}>{title}</p>
      <ul className={styles.filterList}>
        {filters.map((filter) => (
          <li key={filter.id}>
            <Link
              href={buildHref(locale, { ...query, [paramName]: filter.id })}
              className={styles.filterItem}
              aria-current={active === filter.id ? "page" : undefined}
            >
              <span className={styles.checkbox} aria-hidden="true" />
              <span className={styles.filterLabel}>{filter.label[locale]}</span>
              <span className={styles.filterCount}>{filter.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function buildHref(
  locale: Locale,
  params: Record<string, string | undefined>
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (!value || value === "all") continue;
    search.set(key, value);
  }

  const queryString = search.toString();
  return queryString ? `/${locale}/careers?${queryString}` : `/${locale}/careers`;
}
