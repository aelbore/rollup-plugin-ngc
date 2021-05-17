
import { resolve } from 'path'
import { CompilerOptions, ScriptTarget, ModuleKind, ModuleResolutionKind } from 'typescript'
import { createCompilerHost, CompilerHost  } from '@angular/compiler-cli'

import { resolver } from './resolver'
import { compile } from './compile'
import { OptimizerOptions, optimizer, defautSideEffects } from './optimizer'

export interface Options {
  rootDir?: string
  sourceMap?: boolean
  target?: string
  buildOptimizer?: OptimizerOptions
}

export function ngcPlugin(options?: Options) {
  let host: CompilerHost, files = new Map(), sideEffectFreeModules: string[]
  
  const { target = 'es2018', rootDir = 'src', sourceMap = true } = options

  const opts: CompilerOptions = {
    target: ScriptTarget[target.toLocaleUpperCase()],
    module: ModuleKind.ESNext,
    lib: [ 'dom', 'es2015', 'es2017', 'es2018', 'es2019' ],
    rootDir: resolve(rootDir),
    moduleResolution: ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    declaration: false,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    enableIvy: true,
    sourceMap
  }

  return {
    name: 'ngc',
    buildStart: () => {
      sideEffectFreeModules = defautSideEffects(options?.buildOptimizer?.sideEffectFreeModules)
      host = createCompilerHost({ options: opts })
      host.writeFile = (fileName: string, contents: string) => 
        files.set(fileName, contents)
    },
    resolveId: resolver(),
    transform(code: string, id: string) {
      if (!id.includes('node_modules')) {
        return compile({ id: resolve(id).replace(/\\/g, '/'), host, options: opts, files })
      }
      return optimizer(code, id, { 
        sideEffectFreeModules,
        angularCoreModules: options?.buildOptimizer?.angularCoreModules
      })
    }
  }
}
