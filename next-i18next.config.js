/** @type {import('next-i18next').UserConfig} */
const HttpBackend = require("i18next-http-backend/cjs");
const ChainedBackend = require("i18next-chained-backend").default;
const LocalStorageBackend = require("i18next-localstorage-backend").default;

module.exports = {
  backend: {
    backendOptions: [
      { expirationTime: 60 * 60 * 1000 },
      {
        /* loadPath: 'https:// somewhere else' */
      },
    ], // 1 hour
    backends:
      typeof window !== "undefined" ? [LocalStorageBackend, HttpBackend] : [],
  },
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW"],
  },
  serializeConfig: false,
  use: typeof window !== "undefined" ? [ChainedBackend] : [],
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
