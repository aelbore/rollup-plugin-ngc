import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { ngcPlugin } from 'rollup-plugin-ngc'

export default {
  input: './example/src/app.ts',
  plugins: [ 
    ngcPlugin({
      rootDir: './example/src' 
    }),
    resolve(),
    terser({
      output: {
        ascii_only: true,
        comments: false,
        webkit: true,
      },
      compress: {
        pure_getters: true,
        passes: 3,
        global_defs: {
          ngDevMode: false,
        }
      }
    })
  ],
  output: {
    file: './public/app.js',
    format: 'es',
    sourcemap: true
  }
}