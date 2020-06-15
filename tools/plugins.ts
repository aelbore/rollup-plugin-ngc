import { symlinkDir, clean, mkdir } from 'aria-build'

export function symlinkPlugin() {
  return {
    name: 'link',
    buildEnd: async() => {
      await mkdir('dist', { recursive: true })
      await symlinkDir('./dist', './node_modules/rollup-plugin-ngc')
    }
  }
}

export function cleanOptimizer() {
  return {
    name: 'clean',
    buildStart: async () => {
      await clean('./node_modules/@angular-devkit/build-optimizer/node_modules')
    }
  }
}