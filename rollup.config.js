const typescript = require('rollup-plugin-typescript2')

const base = (input, outputDir, extension, format) => ({
  input,
  preserveModules: true,
  treeshake: false,
  output: {
    format,
    dir: outputDir,
    entryFileNames: c => {
      const filepath = c.facadeModuleId.split('/')
      const filename = filepath[filepath.length - 1]
      const file = filename.split('.')
      file[file.length - 1] = extension
      return file.join('')
    }
  },
  watch: {
    include: './**',
    exclude: [
      'node_modules',
      '**/*.spec.ts'
    ],
    clearScreen: false
  },
  external: ['rxjs'],
  plugins: [
    typescript({ 
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true
    }),
  ],
})

module.exports = [
  base('./src/index.ts', './dist','.mjs', 'esm'),
  base('./src/index.ts', './dist', '.js', 'commonjs'),
  base('./src/operators/index.ts', './dist', '.mjs', 'esm'),
  base('./src/operators/index.ts', './dist','.js', 'commonjs'),
  base('./src/rxjs-compat/index.ts', './dist/rxjs-compat','.mjs', 'esm'),
  base('./src/rxjs-compat/index.ts', './dist/rxjs-compat', '.js', 'commonjs'),
]
