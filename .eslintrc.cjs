const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: "sweet",
  rules: {
    "unicorn/no-null": "off"
  }
});
