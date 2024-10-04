import { Version, CommonHeaders, authHeaders } from '../services/global.js';
import { Authentication, Orders, eSIMs } from '../services/endpoints.js';
import { OrdersResponse } from '../services/payloads.js';
import { statusCode } from '../services/statuscodes.js';
import tariffs from '../fixtures/tariffs.json';

const CLIENT_ID = Cypress.env('CLIENT_ID');
const CLIENT_SECRET = Cypress.env('CLIENT_SECRET');

let accessToken, orderId, simId, simPackageId;

const tariff = tariffs.tariffs[0];

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

  //Create Sim Package
  it('POST Sim Package by Airalo Partners', () => {
    const postEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Orders.submitOrders;
    const bodyParams = { quantity: tariff.quantity, package_id: tariff.packageId };
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'POST',
      url: postEndpointUrl,
      headers: authHeaders,
      form: true,
      body: bodyParams,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.SUCCESS);

      //Additional Validation
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('package_id');
      expect(response.body.data).to.have.property('quantity');

      //Additional Validation
      expect(response.body.data.id).not.to.be.null;
      expect(response.body.data.package_id).to.eq(tariff.packageId);
      expect(response.body.data.quantity).to.eq(tariff.quantity);

      //Additional Validation
      //If any New Key Been Added/Modified Test Fails So we can Track Changes Properly or Use this for MergeRequest Test Check for DEV Team
      expect(response.body).to.have.deep.keys(Object.keys(OrdersResponse));

      //Store OrderId
      orderId = response.body.data.id

      //Store SimsId
      simId = response.body.data.sims[0]['id'];
      simPackageId = response.body.data.sims[0]['package_id'];
    });
  });

  //Validating PackageID, Quantity in from OrderList
  it('GET OrderList Info and Validate POST Creation', () => {
    const getEndpointUrl = Cypress.config('baseUrl') + Version.V2 + Orders.getOrderList(orderId);
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'GET',
      url: getEndpointUrl,
      headers: authHeaders,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.SUCCESS);

      //Order List Validation
      expect(response.body.data.package_id).to.eq(tariff.packageId);
      expect(response.body.data.quantity).to.eq(tariff.quantity);

    });
  });

  //Validating SimIDs in eSim List
  it('GET eSim Packages Info and Validate POST Creation', () => {
    const getEndpointUrl = Cypress.config('baseUrl') + Version.V2 + eSIMs.sims;
    authHeaders.Authorization = `Bearer ${accessToken}`;

    cy.request({
      method: 'GET',
      url: getEndpointUrl,
      headers: authHeaders,
    }).then((response) => {
      //StatusCode Assert
      expect(response.status).to.eq(statusCode.SUCCESS);

      //Extracting SimsIDs
      const simsIds = response.body.data.map((simData) => simData.id);
      //SimID Validation
      expect(simsIds.includes(simId)).to.be.true;
    });
  });
});
