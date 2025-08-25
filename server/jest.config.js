module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/app-express/test/**/*.test.ts'],
  verbose: true,
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};