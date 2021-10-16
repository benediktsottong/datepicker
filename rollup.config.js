import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import image from '@rollup/plugin-image'
import { dependencies, peerDependencies } from './package.json'

const external = [
  ...Object.keys(peerDependencies || {}),
]

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: {
    main: 'src/index.tsx',
  },
  output: [
    {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      include: ['src/**'],
      sourceMaps: true,
      compact: true,
      minified: true,
      comments: false,
    }),
    image(),
    terser(),
    filesize(),
  ],
}
