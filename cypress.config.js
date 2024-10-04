import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results',
      });

      switch (config.env.testType) {
        case 'api':
          config.baseUrl = 'https://sandbox-partners-api.airalo.com/';
          config.specPattern = 'cypress/api/**/*cy.js';
          break;
        default:
          config.baseUrl = 'https://www.airalo.com';
          config.specPattern = 'cypress/e2e/**/*cy.js';
          break;
      }

      return config;
    },
    baseUrl: 'https://www.airalo.com',
    specPattern: 'cypress/e2e/**/*cy.js',
  },
  env: {
    uiEnv: 'prod',
    apiEnv: 'sandbox',
  },
  viewportWidth: 1366,
  viewportHeight: 1050,
  watchForFileChanges: false,
  experimentalStudio: true,
  pageLoadTimeout: 90000,
  defaultCommandTimeout: 10000,
});
