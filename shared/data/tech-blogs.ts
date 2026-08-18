export type TechBlog = {
  id: string;
  name: string;
  feedUrl: string;
  siteUrl: string;
  color: string;
};

export const techBlogs: TechBlog[] = [
  {
    id: "naver-d2",
    name: "Naver D2",
    feedUrl: "https://d2.naver.com/rss.xml",
    siteUrl: "https://d2.naver.com",
    color: "#03c75a",
  },
  {
    id: "kakao-tech",
    name: "Kakao Tech",
    feedUrl: "https://tech.kakao.com/feed/",
    siteUrl: "https://tech.kakao.com",
    color: "#f9e000",
  },
  {
    id: "woowahan",
    name: "우아한기술블로그",
    feedUrl: "https://techblog.woowahan.com/feed/",
    siteUrl: "https://techblog.woowahan.com",
    color: "#f04452",
  },
  {
    id: "nhn",
    name: "NHN Cloud",
    feedUrl: "https://meetup.nhncloud.com/rss",
    siteUrl: "https://meetup.nhncloud.com",
    color: "#00a0e8",
  },
  {
    id: "line",
    name: "LINE Engineering",
    feedUrl: "https://engineering.linecorp.com/ko/feed/",
    siteUrl: "https://engineering.linecorp.com/ko",
    color: "#00b300",
  },
  {
    id: "toss",
    name: "Toss Tech",
    feedUrl: "https://toss.im/tech-blog/rss.xml",
    siteUrl: "https://toss.im/tech-blog",
    color: "#0064ff",
  },
  {
    id: "daangn",
    name: "당근 Tech",
    feedUrl: "https://medium.com/feed/daangn",
    siteUrl: "https://medium.com/daangn",
    color: "#ff6f0f",
  },
  {
    id: "coupang",
    name: "Coupang Engineering",
    feedUrl: "https://medium.com/feed/coupang-engineering",
    siteUrl: "https://medium.com/coupang-engineering",
    color: "#0e4194",
  },
  {
    id: "29cm",
    name: "29CM",
    feedUrl: "https://medium.com/feed/29cm",
    siteUrl: "https://medium.com/29cm",
    color: "#222222",
  },
];
