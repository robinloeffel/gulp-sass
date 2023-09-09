/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "sweet",
    "sweet/configs/typescript-typed.cjs"
  ],
  rules: {
    "unicorn/no-null": "off"
  }
};
