import type { Preview } from "@storybook/react";
import "@/styles/reset.css";
import "@/styles/global.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "#1E1F22" }],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
