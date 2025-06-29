module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    collectCoverageFrom: [
      "src/**/*.{js,jsx}",
      "!src/**/*.test.{js,jsx}",
      "!src/index.js",
      "!src/reportWebVitals.js",
      "!src/setupTests.js"
    ]
  };
  