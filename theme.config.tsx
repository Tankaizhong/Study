import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>导航栏 ➡️</span>,
  // project: {
  //   link: "https://github.com/shuding/nextra-docs-template",
  // },
  // chat: {
  //   link: "https://discord.com",
  // },
  // docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    text: "created by Tankaizhong in 2023.6",
  },
  i18n: [{ locale: "zh", text: "中文" }],
};

export default config;
