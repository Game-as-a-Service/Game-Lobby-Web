/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW"],
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
