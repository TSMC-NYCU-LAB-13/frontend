module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js', // No need to cover bootstrap file
    '!src/router/index.js', // No need to cover meta file
    '!src/store/index.js' // No need to cover meta file
  ]
}
