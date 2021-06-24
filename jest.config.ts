export default {
  bail: true,
  clearMocks: true,
  testEnviroment: 'node',
  baseUrl: './',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
};
