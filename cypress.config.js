const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://gorest.co.in/public/v2",
    env: {
      hideCredentials: true,
      requestMode: true,
    },
  },
});
