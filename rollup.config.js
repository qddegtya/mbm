import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: "mbm"
  },
  plugins: [
    babel()
  ]
}
