module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    coveragePathIgnorePatterns: ['/node_modules/', 'src/utils/logger.js', 'src/index.js', 'src/setupTests.js'],
    collectCoverageFrom: [
      "src/**/*.{js,jsx}",
      "!src/**/*.test.{js,jsx}",
      "!src/index.js",
      "!src/reportWebVitals.js",
      "!src/setupTests.js",
      "!src/utils/logger.js"
    ]
  };
  