module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@assessment/(.*)$': '<rootDir>/packages/$1/src',
    },
  };