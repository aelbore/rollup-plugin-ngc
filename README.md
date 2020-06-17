# rollup-plugin-ngc
Rollup plugin for angular with ivy enable

Getting Started
------------
  ```
  git clone https://github.com/aelbore/rollup-plugin-ngc.git
  cd rollup-plugin-ngc
  npm install
  ```

Installation
------------
  ```
  npm install --save-dev rollup-plugin-ngc
  ```

Example
------------
* `npm run ngcc` - compile all `@angular/*` libraries into ivy compatible
* `npm run build` - build `ngcPlugin`
* `npm run example` - build the example code
* `npm run serve` 

Usage
------------
  ```javascript
  import { ngcPlugin } from 'rollup-plugin-ngc'

  export default {
    input: './src/index.ts',
    plugins: [ 
      ngcPlugin() 
    ],
    output: {
      format: 'es',
      file: './dist/hello-world.ts'
    }
  }
  ```

### Options
* `rootDir` - directory of input files (default `src`)
* `sourceMap` - Generates corresponding .map file (default `true`)
* `target` - Specify ECMAScript target version (default `ES2018`)