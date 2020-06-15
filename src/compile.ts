import { createProgram, CompilerHost  } from '@angular/compiler-cli'
import { CompilerOptions } from 'typescript'
import { join, basename, parse } from 'path'

export interface CompileOptions {
  id: string
  host: CompilerHost
  options: CompilerOptions
  files: Map<string, string>
}

export function compile(opts: CompileOptions) {
  const { id, host, options, files } = opts

  const programm = createProgram({ rootNames: [ id ], options, host })
  programm.emit()

  const file = join(options.outDir, parse(basename(id)).name)
  const map = files.get(`${file}.js.map`)
  const code = files.get(`${file}.js`)

  return {
    code: (code ?? '').replace(/\/\/# sourceMappingURL.*/, ''), 
    map 
  }
}