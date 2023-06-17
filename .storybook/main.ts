import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["../components/shared/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config) {
    const fileLoaderRules = config.module?.rules?.filter(
      (rule) =>
        rule !== "..." &&
        rule.test &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );

    fileLoaderRules?.forEach((rule) => {
      if (rule !== "...") rule.exclude = /\.svg$/;
    });

    config.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};
export default config;
