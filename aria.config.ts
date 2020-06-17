import { mkdir, symlinkDir } from 'aria-build'

export default {
  plugins: [ 
    {
      name: 'link',
      buildEnd: async() => {
        await mkdir('dist', { recursive: true })
        await symlinkDir('./dist', './node_modules/rollup-plugin-ngc')
      }
    }
  ]
}