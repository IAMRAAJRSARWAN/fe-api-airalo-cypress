## Airalo Test Challenge

## Getting started
```
git remote add origin https://github.com/IAMRAAJRSARWAN/fe-api-airalo-cypress.git
git branch -M main
git push -u origin main
```

## Installation - Local

```
Clone Repo: 

git clone https://github.com/IAMRAAJRSARWAN/fe-api-airalo-cypress.git

npm installation of packages: 

npm install or npm i 
```

## Project Setup
```
Directory:
    Cypress
        api - contains all API Tests
        e2e - contains all Ui Tests
        fixtures - contains locators, currency, tariff test data's
        services - contains endpoints, paylods, global common settings 
```

## Usage
```
Cypress Config Designed to use Both UI and API Tests Suites

To Execute Ui Tests: All Tests Will Execute
    npx cypress run | npm run cy:run:ui
    
To Execute API Tests: All Tests Will Execute, If You Pass testType=api only API Tests Suite Execute
    npx cypress run --env testType=api | npm run cy:run:api
    
To Build and Show Report: Required JDK/JRE in Local
    npx allure serve allure-results | npm run cy:allure:generate
    
```

## GitHub CI Actions Test Run
```
In GitHub Actions Following Test will Execute UI, API

Report will be Generated , View in GitHub Pages (Static Pages for Allure Report)

```

## Report Allure
```    
To Build and Show Report: Required JDK/JRE in Local
    npx allure serve allure-results | npm run cy:allure:generate
    
```

## Authors
```
Saravanan Rajamanickam
Airalo Test Challenge
```