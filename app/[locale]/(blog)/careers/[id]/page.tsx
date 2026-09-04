import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJob, jobs } from "@/shared/data/careers";
import { isLocale, type Locale } from "@/shared/i18n/config";

import styles from "../careers.module.css";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

const copy = {
  ko: {
    back: "채용 목록",
    overview: "Overview",
    responsibilities: "주요 업무",
    requirements: "자격 요건",
    benefits: "근무 환경",
    process: "채용 절차",
    deadline: "마감",
    employment: "고용 형태",
    location: "지역",
    level: "대상",
    skills: "기술",
    apply: "메일로 문의",
    related: "다른 채용",
    contactEmail: "jeff.cofos@gmail.com",
  },
  ja: {
    back: "求人一覧",
    overview: "Overview",
    responsibilities: "主な業務",
    requirements: "応募条件",
    benefits: "勤務環境",
    process: "選考プロセス",
    deadline: "締切",
    employment: "雇用形態",
    location: "地域",
    level: "対象",
    skills: "技術",
    apply: "メールで問い合わせ",
    related: "他の求人",
    contactEmail: "jeff.cofos@gmail.com",
  },
} satisfies Record<Locale, Record<string, string>>;

export function generateStaticParams() {
  return jobs.flatMap((job) =>
    (["ko", "ja"] as const).map((locale) => ({ locale, id: job.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;

  if (!isLocale(locale)) notFound();

  const job = getJob(id);
  if (!job) notFound();

  return {
    title: `${job.role[locale]} | ${job.company}`,
    description: job.summary[locale],
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { locale, id } = await params;

  if (!isLocale(locale)) notFound();

  const job = getJob(id);
  if (!job) notFound();

  const t = copy[locale];
  const relatedJobs = jobs.filter((item) => item.id !== job.id).slice(0, 3);
  const tags = Array.from(new Set([...job.language, ...job.tags]));

  return (
    <main className="site-main">
      <div className={styles.wrapper}>
        <div className={styles.detailGrid}>
          <section className={styles.detailHero}>
            <Link href={`/${locale}/careers`} className={styles.backLink}>
              {t.back}
            </Link>
            <div className={styles.jobMeta}>
              <span>{job.company}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>{job.level[locale]}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>{job.location[locale]}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>{job.employment[locale]}</span>
            </div>
            <h1 className={styles.detailTitle}>{job.role[locale]}</h1>
            <p className={styles.detailIntro}>{job.summary[locale]}</p>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <article className={styles.detailBody}>
            <section className={styles.detailSection}>
              <p className={styles.searchHeading}>{t.overview}</p>
              <p className={styles.detailText}>{job.description[locale]}</p>
            </section>
            <DetailList title={t.responsibilities} items={job.responsibilities[locale]} />
            <DetailList title={t.requirements} items={job.requirements[locale]} />
            <DetailList title={t.benefits} items={job.benefits[locale]} />
            <DetailList title={t.process} items={job.process[locale]} ordered />
          </article>

          <aside className={styles.detailAside}>
            <section className={styles.sideSection}>
              <p className={styles.sideHeading}>{t.overview}</p>
              <dl className={styles.factList}>
                <div>
                  <dt>{t.deadline}</dt>
                  <dd>{job.deadline[locale]}</dd>
                </div>
                <div>
                  <dt>{t.location}</dt>
                  <dd>{job.location[locale]}</dd>
                </div>
                <div>
                  <dt>{t.employment}</dt>
                  <dd>{job.employment[locale]}</dd>
                </div>
                <div>
                  <dt>{t.level}</dt>
                  <dd>{job.level[locale]}</dd>
                </div>
                <div>
                  <dt>{t.skills}</dt>
                  <dd>{job.language.join(", ")}</dd>
                </div>
              </dl>
              <a
                className={styles.emailLink}
                href={`mailto:${t.contactEmail}?subject=${encodeURIComponent(`[채용 문의] ${job.company} ${job.role[locale]}`)}`}
              >
                {t.apply}
              </a>
            </section>

            <section className={styles.sideSection}>
              <p className={styles.sideHeading}>{t.related}</p>
              <ul className={styles.compactList}>
                {relatedJobs.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${locale}/careers/${item.id}`}
                      className={styles.compactItem}
                    >
                      <span className={styles.urgentDot} aria-hidden="true" />
                      <span className={styles.compactTitle}>{item.role[locale]}</span>
                      <span className={styles.compactMeta}>{item.company}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailList({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  const List = ordered ? "ol" : "ul";

  return (
    <section className={styles.detailSection}>
      <h2 className={styles.detailSectionTitle}>{title}</h2>
      <List className={styles.detailList}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </section>
  );
}
