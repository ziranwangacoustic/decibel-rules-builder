// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js?(x)',
    '!src/*.js?(x)',
    '!src/**/index.js',
    '!src/**/*.mock.js',
    '!src/**/test*',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/config/', '/coverage/'],
  coverageReporters: ['html', 'text', 'lcov', 'text-summary'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.svg$': '<rootDir>/config/fileTransformer.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(carbon-components|recharts|@carbon/charts))'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^dnd-core$': 'dnd-core/dist/cjs',
    '^react-dnd$': 'react-dnd/dist/cjs',
    '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
    '^react-dnd-touch-backend$': 'react-dnd-touch-backend/dist/cjs',
    '^react-dnd-test-backend$': 'react-dnd-test-backend/dist/cjs',
    '^react-dnd-test-utils$': 'react-dnd-test-utils/dist/cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
