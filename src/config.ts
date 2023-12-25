const config = {
  blog: {
    page_size: 50,
    excerpt_separator: "<!-- Excerpt -->"
  },
  deploy: process.env.LOCALHOST ?? "https://hoonkun.kiwi"
} as const;

export default config;
