import { buildOptimizer } from '@angular-devkit/build-optimizer'
import { readdirSync } from 'fs'
import { join } from 'path'

export const defautSideEffects = (sideEffectFreeModules?: string[]) => {
  const sideEffects = readdirSync('node_modules/@angular')
    .map(effect => join('node_modules/@angular', effect))
  return [ 
    ...sideEffects, 
    'node_modules/rxjs', 
    ...(sideEffectFreeModules ?? []) 
  ].map(p => p.replace(/\\/g, '/'))
}

export interface OptimizerOptions {
  sideEffectFreeModules?: string[]
  angularCoreModules?: string[]
}

/// this is original code from 
/// https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_optimizer/src/build-optimizer/rollup-plugin.ts
export function optimizer(content: string, id: string, options: OptimizerOptions) {
  const normalizedId = id.replace(/\\/g, '/');
  const isSideEffectFree =
    options.sideEffectFreeModules &&
    options.sideEffectFreeModules.some(m => normalizedId.indexOf(m) >= 0)
  const isAngularCoreFile =
    options.angularCoreModules &&
    options.angularCoreModules.some(m => normalizedId.indexOf(m) >= 0)

  const result = buildOptimizer({
    content,
    inputFilePath: id,
    emitSourceMap: true,
    isSideEffectFree,
    isAngularCoreFile,
  })

  return { 
    code: result.content,
    map: result.sourceMap
  }
}