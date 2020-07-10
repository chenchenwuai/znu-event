import typescript from 'rollup-plugin-typescript'

import pkg from './package.json'

import sourceMaps from 'rollup-plugin-sourcemaps'

const banner =
`/*!
 *  znu-event v${pkg.version}
 *  (c) 2020-${new Date().getFullYear()} chenwuai
 *  https://github.com/chenchenwuai/znu-event.git
 * Released under the MIT License.
 */`

export default {
  input: './src/main.ts',
  plugins: [
    // 编译ts
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),

    // 生成sourcemap文件
    sourceMaps()

  ],
  output: [
    {
      format: 'cjs',
      // 生成的文件名和路径
      // package.json的main字段, 也就是模块的入口文件
      file: pkg.main,
      banner,
      sourcemap: true
    },
    {
      format: 'es',
      // rollup和webpack识别的入口文件, 如果没有该字段, 那么会去读取main字段
      file: pkg.module,
      banner,
      sourcemap: true
    },
    {
      format: 'umd',
      name: 'ZnuEvent',
      file: pkg.browser,
      banner,
      sourcemap: true
    }
  ]
}
