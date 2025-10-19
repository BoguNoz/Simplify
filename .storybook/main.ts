import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)", "../src/**/*.stories.@(js|jsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@core": "/src",
    };


    return config;
  },
};

export default config;