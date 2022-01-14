// module.exports = {
//   testPathIgnorePatterns: ["/node_modules", "/.next"],
//   setupFilesAfterEnv: [
//     "<rootDir>/src/tests/setupTests.ts"
//   ],
//   transform: {
//     '^.+\\.(ts|tsx)?$': 'ts-jest',
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   testEnvironment: 'jsdom',
//   collectCoverage: false,
//   collectCoverageFrom: [
//     "src/**/*.{tsx}",
//     "!src/pages/_app.tsx",
//     "!src/pages/_document.tsx",
//   ],
//   coverageReporters: ['lcov', 'json'],
//   moduleNameMapper: {
//     "\\.(scss|css|sas)$": "identity-obj-proxy"
//   }
// }

module.exports = {
  testPathIgnorePatterns: ["/node_modules", "/.next"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(scss|css|sas)$": "identity-obj-proxy",
    '@/(.*)': '<rootDir>/src/$1'
  }
}