import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { createRequire } from 'node:module'; // ← КРИТИЧНО!

// @ts-ignore
const require = createRequire(import.meta.url);
const pkg = require('./package.json'); // ← CommonJS стиль!

export default {
  input: ['./src/index.ts'],
  external: ['react', 'react-dom'], // ✅ React НЕ бандлится!
  output: [
    {
      file: pkg.main || 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: false,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
    {
      file: pkg.module || 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false,
    }
  ],
  plugins: [
    resolve({
      browser: true // ✅ Для браузера
    }),
    postcss({
      modules: true,
      extract: false,
    }),
    commonjs(),
    typescript({
      sourceMap: false,
      tsconfig: './tsconfig.json',
    }),
    terser()
  ],
}
