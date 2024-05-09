const {defineConfig} = require("cypress");

module.exports = defineConfig({
  projectId: 'imczkx',
    pageLoadTimeout: 15000,

    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        setupNodeEvents(on, config) {
            return config;
        }
    },
});
