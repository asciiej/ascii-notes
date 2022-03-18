/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
            decorators: true,
          },
          target: "es2021",
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: "es2021",
          noInterop: false,
        },
      },
    ],
  },

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["<rootDir>/src/application/useCases/**/index.ts"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["text-summary", "lcov"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ["dotenv/config"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/*.spec.ts"],
};