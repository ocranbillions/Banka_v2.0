# Banka v2.0
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. 

[![Build Status](https://travis-ci.com/ocranbillions/Banka_v2.0.svg?branch=develop)](https://travis-ci.com/ocranbillions/Banka_v2.0) [![Coverage Status](https://coveralls.io/repos/github/ocranbillions/Banka_v2.0/badge.svg?branch=develop)](https://coveralls.io/github/ocranbillions/Banka_v2.0?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/4c600fc965c6d7b6098e/maintainability)](https://codeclimate.com/github/ocranbillions/Banka_v2.0/maintainability)
## Getting Started
### Prerequisites
The tools listed below are needed to run this application:
* Node v10.15.0 or above
* Npm v6.4 or above
* 
### Installation
`git clone https://github.com/ocranbillions/Banka_v2.0.git`
- Pull the develop branch off this repository
- Run `npm install` to install all dependencies
- Run npm start to start the app
- Access endpoints on **localhost:3000**

### How it works
- Customer sign up and create as many bank accounts as they want
- But must visit the bank for deposit/withdrawal
- Customer can view their account history 
- Cashier can place debit/credit transactions on customer's account
- Cashier can view all customers accounts
- Admin creates staff account for each new cashier
- Admin can delete any account. Can also place account status on dormant or active.
- Accounts created by admin can be of type admin or just regular staff
- If type is admin, the newly created account has all admin prividelges; account creation, deletion, and changing of account status


### Endpoints
| Method      | Description    | Endpoints    | Role   | 
| :------------- | :----------: | -----------: | -----------: |
|  POST | Create user   | /api/v1/auth/signup    | *   |
| POST   | signin user | /api/v1/auth/signin | * |
|  POST | create new bank account   | /api/v1/accounts/    | client   |
| GET  |fetch all accounts | /api/v1/accounts/ | cashier + admin |
| GET  |fetch all active accounts | /api/v1/accounts/?status=active/ | cashier + admin |
| GET  |fetch all dormant accounts | /api/v1/accounts/?status=dormant/ | cashier + admin |
| GET  |get details of an account | /api/v1/accounts/:number | * |
| DELETE  |Delete a bank account | /api/v1/accounts/:number | admin |
| PATCH  |change bank account status | /api/v1/accounts/:number | admin |
| POST |Credit an account | /api/v1/transactions/:number/credit | cashier |
| POST |Debit an account | /api/v1/transactions/:number/debit | cashier |
| GET|Get account history| /api/v1/transactions/:number | cashier + client |
| GET|Get all users| /api/v1/users | admin + cashier |
| GET|Get single user| /api/v1/users/id | admin + cashier |
| POST|create new staff account| /api/v1/users/ | admin |
| DELETE|Delete staff| /api/v1/users/id | admin |

### Swagger documentation
https://banka2.herokuapp.com/api-docs/

### Running the tests
Run `npm test` in the root folder.


### Author
[**Samuel Ocran**](https://twitter.com/ocranbillions)
