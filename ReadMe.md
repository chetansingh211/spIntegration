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
Service request data
```bash
{  
    "totalAmount": {  
        "amount": "40.70",
        "currency": "EUR"
    },
    "consumer": {  
        "phoneNumber": "0400000001",
        "givenNames": "Joe",
        "surname": "Consumer",
        "email": "test@scalapay.com"
    },
    "billing": {  
        "name": "Joe Consumer",
        "line1": "Via della Rosa, 23",
        "suburb": "Montelupo Fiorentino",
        "postcode": "50056",
        "countryCode": "IT",
        "phoneNumber": "0400000000"
    },
    "shipping": {  
        "name": "Joe Consumer",
        "line1": "Via della Rosa, 23",
        "suburb": "Montelupo Fiorentino",
        "postcode": "50056",
        "countryCode": "IT",
        "phoneNumber": "0400000000"
    },
    "items":[  
         {
             "name": "T-Shirt",
             "category": "clothes",
             "subcategory": ["shirt", "long-sleeve"],
             "brand": "TopChoice",
             "gtin": "123458791330",
             "sku": "12341234",
             "quantity": 1,
             "price": {
                 "amount": "10.00",
                 "currency": "EUR"
             }
         },
         {
             "name": "Jeans",
             "category": "clothes",
             "subcategory": ["pants", "jeans"],
             "brand": "TopChoice",
             "gtin": "123458722222",
             "sku": "12341235",
             "quantity": 1,
             "price": {
                 "amount": "20.00",
                 "currency": "EUR"
             }
         }
    ],
    "discounts": [
        {
            "displayName": "10% Off",
            "amount": {
                "amount": "3.00",
                "currency": "EUR"
            }
        }
    ],
    "merchant": {
        "redirectConfirmUrl": "https://staging.portal.scalapay.com/success-url",
        "redirectCancelUrl": "https://staging.portal.scalapay.com/failure-url"
    },
    "merchantReference": "merchantOrder-1234",
     "taxAmount": {  
        "amount": "3.70",
        "currency": "EUR"
     },
     "shippingAmount": {  
         "amount": "10.00",
         "currency": "EUR"
    },
    "orderExpiryMilliseconds": 6000000
  }
  ```
  Service Response
  ```bash
  {
  "token": "D1K210DDQ6",
  "expires": "2019-10-21T23:45:37.086Z",
  "checkoutUrl": "https://staging.portal.scalapay.com/checkout?token=D1K210DDQ6"
}
```
