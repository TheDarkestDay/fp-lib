module.exports = {
  roots: [
    "<rootDir>"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
};