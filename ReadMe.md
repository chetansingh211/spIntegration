# spIntegration

Node.js Backend API Integration for ScalaPay API

## Features

- Make [SCALAPAY API](https://docs.api.scalapay.com/?version=latest#intro) request.
- get the Merchant configurations /v2/configuration/ from the ScalaPay configuration.
- Makes a call to /v2/orders and receives an order-token
- Validated the mandatory input for orders

## Installing dependencies

Using npm:

```bash
$ npm install
```

## Runnig Test Cases

```bash
$ npm test
```

## Running the application

```bash
$ npm start
```

## Using the API

Service endpoints

1. GET /v2/configurations

Service endpoint will fetch the maerchant configuration from the ScalaPay API endpoint.

```bash
GET /v2/configurations
```
Service Response:

```bash
{
  "type": "PAY_BY_INSTALLMENT",
  "description": "'Pay over time'",
  "minimumAmount": {
    "amount": "5.00",
    "currency": "EUR"
  },
  "maximumAmount": {
    "amount": "300.00",
    "currency": "EUR"
  },
  "numberOfPayments": "3",
  "promotionUrl": "https://promotion.scalapay.com/popup/default/",
  "locales": [
    "en",
    "fr",
    "it"
  ]
}
```

2. POST /v2/orders

Service endpoint is use to create order and receive order token from the ScalaPay API endpoint.

```bash
POST /v2/orders
```
