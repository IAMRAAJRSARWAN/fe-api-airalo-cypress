export const cookiesBanner = {
  cookiesAccept: 'button[id="onetrust-accept-btn-handler"]',
};

export const landingPage = {
  companyLogo: 'img[data-testid="airalo-logo"]',
  searchInput: 'input[data-testid="search-input"]',
};

export const searchOptions = {
  country: (countryName) => `[data-testid="${countryName}-name"]`,
};

export const tariffLayout = {
  tariffContainer: 'a[data-testid="sim-package-item"]',
  operatorTitle: '[data-testid="operator-title"]',
  buyNow: '[data-testid="esim-button"]',
};

export const packageLayout = {
  packageHeader: '[data-testid="sim-detail-header"]',
  operatorTitle: '[data-testid="sim-detail-header"] [data-testid="sim-detail-operator-title"]',
  coverageValue: '[data-testid="sim-detail-header"] [data-testid="COVERAGE-value"]',
  tariffData: '[data-testid="sim-detail-header"] [data-testid="DATA-value"]',
  validityValue: '[data-testid="sim-detail-header"] [data-testid="VALIDITY-value"]',
  priceValue: '[data-testid="sim-detail-header"] [data-testid="PRICE-value"]',
};
