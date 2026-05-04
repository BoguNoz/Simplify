import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },

  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@core': path.resolve(__dirname, '../src'),
    };

    return config;
  },
};

export default config;