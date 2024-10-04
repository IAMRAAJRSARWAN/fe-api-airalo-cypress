import { Version, CommonHeaders, authHeaders } from '../services/global.js';
import { Authentication, Orders, eSIMs } from '../services/endpoints.js';
import { statusCode } from '../services/statuscodes.js';
import tariffs from '../fixtures/tariffs.json';

const CLIENT_ID = Cypress.env('CLIENT_ID');
const CLIENT_SECRET = Cypress.env('CLIENT_SECRET');
const CLIENT_ID_INVALID = Cypress.env('CLIENT_ID_INVALID');
const CLIENT_SECRET_INVALID = Cypress.env('CLIENT_SECRET_INVALID');

let accessToken, simId, simPackageId;

const tariffValid = tariffs.tariffs[0];
const tariffInvalid = tariffs.tariffs[1];

describe('Test API Validation Suite', () => {
  before('Request Access Token', () => {
    const authEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Authentication.authToken;
    const bodyParams = {
      client_id: `${CLIENT_ID}`,
      client_secret: `${CLIENT_SECRET}`,
      grant_type: 'client_credentials',
    };

    cy.request({
      method: 'POST',
      url: authEndpointUrl,
      headers: CommonHeaders,
      body: bodyParams,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.SUCCESS);
      //Additional Validation
      expect(response.body.data).to.have.property('token_type');
      expect(response.body.data).to.have.property('expires_in');
      expect(response.body.data).to.have.property('access_token');

      //Store AccessToken in Variable
      accessToken = response.body.data['access_token'];
    });
  });

  //Additional Test for Request Auth Token Endpoint //ErrorCode 422
  it('POST NegativeTest 422 for AuthToken Endpoint', () => {
    const authEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Authentication.authToken;
    const bodyParams = {
      client_id: `${CLIENT_ID_INVALID}`,
      client_secret: `${CLIENT_SECRET_INVALID}`,
      grant_type: 'client_credentials',
    };

    cy.request({
      method: 'POST',
      url: authEndpointUrl,
      headers: CommonHeaders,
      body: bodyParams,
      failOnStatusCode: false,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.UNPROCESSABLE_ENTITY);
      expect(response.body.data.client_id).to.be.eq('Your account is terminated.');
    });
  });

  //Additional Test for Request Auth Token Endpoint //ErrorCode 401
  it('POST NegativeTest 401 for AuthToken Endpoint', () => {
    const authEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Authentication.authToken;
    const bodyParams = {
      client_id: `${CLIENT_ID}`,
      client_secret: `${CLIENT_SECRET_INVALID}`,
      grant_type: 'client_credentials',
    };

    cy.request({
      method: 'POST',
      url: authEndpointUrl,
      headers: CommonHeaders,
      body: bodyParams,
      failOnStatusCode: false,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.UNAUTHORIZED);
      expect(response.body.meta.message).to.be.eq('Client authentication failed');
    });
  });

  //Additional Test for Create Sim Package Endpoint //ErrorCode 422
  it('POST NegativeTest 422 Invalid Sim Package', () => {
    const postEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Orders.submitOrders;
    const bodyParams = { quantity: tariffValid.quantity, package_id: tariffInvalid.packageIdInvalid };
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'POST',
      url: postEndpointUrl,
      headers: authHeaders,
      form: true,
      body: bodyParams,
      failOnStatusCode: false,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.UNPROCESSABLE_ENTITY);
      expect(response.body.data.package_id).to.be.eq('The selected package is invalid.');
    });
  });

  //Additional Test for Create Sim Package Endpoint //ErrorCode 422
  it('POST NegativeTest 422 Invalid Sim Quantity', () => {
    const postEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Orders.submitOrders;
    const bodyParams = { quantity: tariffInvalid.quantityInvalid, package_id: tariffValid.packageId };
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'POST',
      url: postEndpointUrl,
      headers: authHeaders,
      form: true,
      body: bodyParams,
      failOnStatusCode: false,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.UNPROCESSABLE_ENTITY);
      expect(response.body.data.quantity).to.be.eq('The quantity may not be greater than 50.');
    });
  });

  //Additional Test for Create Sim Package Endpoint //ErrorCode 422
  it('POST NegativeTest 422 Invalid Sim Quantity and Sim Package', () => {
    const postEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Orders.submitOrders;
    const bodyParams = { quantity: tariffInvalid.quantityInvalid, package_id: tariffInvalid.packageIdInvalid };
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'POST',
      url: postEndpointUrl,
      headers: authHeaders,
      form: true,
      body: bodyParams,
      failOnStatusCode: false,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.UNPROCESSABLE_ENTITY);
      expect(response.body.data.package_id).to.be.eq('The selected package is invalid.');
      expect(response.body.data.quantity).to.be.eq('The quantity may not be greater than 50.');
    });
  });

  //Additional Test for Create Sim Package Endpoint //ErrorCode 422
  it('POST NegativeTest 422 Invalid Brand', () => {
    const postEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Orders.submitOrders;
    const bodyParams = {
      quantity: tariffValid.quantity,
      package_id: tariffValid.packageId,
      brand_settings_name: 'our perfect brand',
    };
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'POST',
      url: postEndpointUrl,
      headers: authHeaders,
      form: true,
      body: bodyParams,
      failOnStatusCode: false,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.UNPROCESSABLE_ENTITY);
      expect(response.body.data.brand_settings_name).to.be.eq('The selected brand settings name is invalid.');
    });
  });

  //Additional Test for GET eSims Endpoint
  it('GET Sim Info with Out of Range of Limit', () => {
    const getEndpointUrl = Cypress.config('baseUrl') + Version.V2 + eSIMs.simsFilterLimit;
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'GET',
      url: getEndpointUrl,
      headers: authHeaders,
      failOnStatusCode: false,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.UNPROCESSABLE_ENTITY);
      expect(response.body.data.limit).to.be.eq('The limit may not be greater than 100.');
    });
  });
});
