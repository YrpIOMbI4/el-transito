import { Configuration } from 'webpack';
import 'webpack-dev-server';

import { devServer } from './tools/webpack/dev-server/dev-server';
import { output } from './tools/webpack/output/output';
import { html } from './tools/webpack/plugins/html';

import { cssLoader } from './tools/webpack/rules/css-loader';
import { jsLoader } from './tools/webpack/rules/js-loader';
import { tsLoader } from './tools/webpack/rules/ts-loader';
import path from 'path';

const folder = __dirname;

const config: Configuration = {
  mode: 'development',
  target: 'web',
  cache: false,
  entry: './src/index.tsx',
  output: output({ folder }),

  module: {
    rules: [tsLoader(), jsLoader(), cssLoader()],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { path: false, fs: false },
  },

  plugins: [html()],

  devServer: devServer(),
};

export default config;
