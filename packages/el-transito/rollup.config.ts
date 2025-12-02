import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'node:module';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

// @ts-ignore
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default {
  input: ['./src/index.ts'],
  external: ['react', 'react-dom'],
  output: [
    {
      file: pkg.main || 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      file: pkg.module || 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    resolve({
      browser: true,
      dedupe: ['react', 'react-dom'],
      extensions: ['.js', '.ts', '.tsx'],
    }),
    postcss({
      modules: true,
      extract: false,
      minimize: true,
      plugins: [],
    }),
    commonjs(),
    typescript({
      sourceMap: false,
      tsconfig: './tsconfig.json',
      noEmitOnError: true,
    }),
    terser({
      compress: {
        dead_code: true,
        unused: true,
        toplevel: true,
        passes: 2,
        drop_console: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    }),
  ].filter(Boolean),
};
