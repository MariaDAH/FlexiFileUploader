import type { Preview } from "@storybook/react";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      backgrounds: {
        disable: true,
        values: [
          { name: "light", value: "#F1F1F1" },
          { name: "dark", value: "#15232D" },
        ],
      },
    },
  },
};

export default preview;
