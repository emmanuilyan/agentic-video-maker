import {Config} from '@remotion/cli/config';
import path from 'node:path';

// The reusable shader lives outside the example's directory.
Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    modules: [path.resolve('node_modules'), ...(config.resolve?.modules ?? [])],
  },
}));
