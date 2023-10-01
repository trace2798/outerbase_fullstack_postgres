interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}
export const siteConfig: SiteConfig = {
  name: "Summize",
  description:
    "An open source application made using Outerbase to share and review books you love",
  url: "https://outerbase-fullstack-postgres.vercel.app/",
  ogImage: "https://outerbase-fullstack-postgres.vercel.app/og.png",
  links: {
    twitter: "https://twitter.com/Tisonthemove247",
    github: "https://github.com/trace2798/outerbase_fullstack_postgres",
  },
};
