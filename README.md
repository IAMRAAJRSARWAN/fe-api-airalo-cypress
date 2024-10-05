## Airalo Test Challenge

## Getting started
```
git remote add origin https://github.com/IAMRAAJRSARWAN/fe-api-airalo-cypress.git
git branch -M main
git push -u origin main

Best Practices : Create PR All the time
git status
git add . | git add <required Files>
git commit -m "Commit Message"
git push -u origin <branchName>

Create PR in GitHub and Set it for Approval
```

## Installation - Local

```
Clone Repo: 

git clone https://github.com/IAMRAAJRSARWAN/fe-api-airalo-cypress.git

npm installation of packages: 

npm install or npm i 
```

## Project Structure
```
Directory:
    Cypress
        api - contains all API Tests
        e2e - contains all Ui Tests
        fixtures - contains locators, currency, tariff test data's
        services - contains endpoints, paylods, global common settings 
```

## Project Implementation Approach
```
1. Keeps both API, UI Tests Within Same Cypress Project, Provies More Extendable, Flexiable to Use Tests, Mix of Both Together 
   Ex: Create Order in API and Validate in UI. Cross Domain Verification.

2. Setup of ESLint , Prettier Provides Clean Code, Readable Structure Helps to Understand better as well Debug.

3. GitHub Actions for Execute Tests on Each Push to Master Would Helps to Make sure Tests are Good. GitHub Pages for Allure Reporter

```

## Tests Implementation Approach
```
1. UI Tests are Desinged to Extend to Different Country Tariff Setup. 
   Ex: Test Challenge for Japan. However can extend to Germnay - Required Setup: TestData of Tariffs for Germany 
   Ex: Can Convert those Tests into Cypress Commands / Reusbale Functions to make it Reusbale for Different Country Tests

2. API Tests are Designed to Extend Easily and Implement Other MicroService Endpoints Tests
   Keeps Payload Structure and Validate Them Works as Contract Test
   Suggestion: Involve Integration Tests to make sure Product Stable based on BackEnd Testing
   
```

## Usage
```
Cypress Config Designed to use Both UI and API Tests Suites

To Execute Ui Tests: All Tests Will Execute : Default Browser - Electron
    npx cypress run | npm run cy:run:ui
    
To Execute Ui,API Tests with Different Browsers 
    npx cypress run --browser=chrome | cy:run:ui:chrome
    npx cypress run --browser=chrome | cy:run:api:chrome
    
    npx cypress run --browser=firefox | cy:run:ui:firefox - Not in NPM Script but Can Create Like This
    npx cypress run --browser=firefox | cy:run:api:firefox - Not in NPM Script but Can Create Like This
    
To Execute API Tests: All Tests Will Execute, If You Pass testType=api only API Tests Suite Execute
    npx cypress run --env testType=api | npm run cy:run:api
    
To Build and Show Report: Required JDK/JRE in Local
    npx allure serve allure-results | npm run cy:allure:generate
    
```

## GitHub CI Actions Test Run
```
In GitHub Actions Following Test will Execute UI, API

Report will be Generated , View in GitHub Pages (Static Pages for Allure Report)

IMPORTANT: To Enable Report Feature , Repo must be in Public Visibility

Report URL: https://iamraajrsarwan.github.io/fe-api-airalo-cypress/index.html

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