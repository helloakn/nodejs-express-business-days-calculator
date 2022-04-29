const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["./node_modules/"],
  moduleFileExtensions: ["js", "json", "es6"],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
}