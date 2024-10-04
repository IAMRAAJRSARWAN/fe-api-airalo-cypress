import * as locators from '../fixtures/locators.js';
import tariffs from '../fixtures/tariffs.json';
import * as currencies from '../fixtures/currencies.js';

const japan = tariffs.japan;

describe('Test Tariff Validation Suite', () => {
  before('Launch Browser, Enter the Airalo Site', () => {
    cy.visit('/');
    cy.get(locators.cookiesBanner.cookiesAccept).click();
    cy.get(locators.landingPage.companyLogo).should('be.visible');
  });

  it('Tariff Validation Test Japan', () => {
    cy.get(locators.landingPage.searchInput).type('Japan');
    cy.get(locators.searchOptions.country('Japan')).click();

    //URL Validation
    cy.url().should('include', '/japan-esim');

    //Validating Operator Title of Each Tariff Container
    cy.get(locators.tariffLayout.tariffContainer).each(($container) => {
      cy.wrap($container)
        .find(locators.tariffLayout.operatorTitle)
        .invoke('text') // Get the text of the operator title
        .then((text) => {
          expect(text).contain('Moshi Moshi');
        });
    });

    //Select First Occurrence of Tariff
    cy.get(locators.tariffLayout.tariffContainer)
      .first()
      .find(locators.tariffLayout.buyNow)
      .contains('BUY NOW')
      .click({ force: true });
    cy.get(locators.packageLayout.packageHeader).should('be.visible');

    //Package Popup Details Validations
    cy.get(locators.packageLayout.operatorTitle).should('contain.text', japan[0].Title);
    cy.get(locators.packageLayout.coverageValue).should('contain.text', japan[0].Coverage);
    cy.get(locators.packageLayout.tariffData).should('contain.text', japan[0].Data);
    cy.get(locators.packageLayout.validityValue).should('contain.text', japan[0].Validity);
    cy.get(locators.packageLayout.priceValue).should('contain.text', japan[0].Price);

    //Validation of Price Format
    cy.get(locators.packageLayout.priceValue)
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.match(new RegExp(currencies.priceFormat.AMERICAS));
      });
  });
});
