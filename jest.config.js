module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,js,tsx,jsx}',
    '!src/**/index.{ts,js,tsx,jsx}',
    '!src/**/index.barrel.{ts,js,tsx,jsx}',
  ],
  coverageDirectory: 'reports/coverage',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  reporters: [
    'default',
    'jest-junit'
  ],
  testRegex: '.*\\.spec\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    "<rootDir>/jest-setup.ts"
  ],
}
