import type { Preview } from "@storybook/react";
import "@/styles/reset.css";
import "@/styles/global.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [
        {
          name: "Dark",
          value: "linear-gradient(145.51deg, #06020B -7.4%, #2C1B47 154.79%)",
        },
      ],
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
