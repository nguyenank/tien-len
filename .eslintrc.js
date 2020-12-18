module.exports = {
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: "detece", // React version. "detect" automatically picks the version you have installed.
    },
  },
};
