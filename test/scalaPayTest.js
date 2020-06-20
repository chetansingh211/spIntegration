//set the env variable to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

const should = chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('ScalaPay Integration', () => {
  /*
    GET The configurations
  */
  describe("GET /v2/configurations", () => {
    it("it should get the configurations", (done) => {    
      chai.request(server)
        .get('/v2/configurations')
        .end((err, response) => {
          response.should.have.status(200);
        done();
        })
    })
  })

  /*
    Merchant site makes and receives an order-token
  */
  describe("POST /v2/orders", () => {
  it("It should makes order and receives an order-token with only mandatory data", (done) => {    
    const order = {  
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
          "merchant": {
              "redirectConfirmUrl": "https://staging.portal.scalapay.com/success-url",
              "redirectCancelUrl": "https://staging.portal.scalapay.com/failure-url"
          }    
      };
    chai.request(server)
      .post('/v2/orders')
      .send(order)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('token');
        response.body.should.have.property('expires');
        response.body.should.have.property('checkoutUrl');
      done();
      })
    })
  })


  /*
    Merchant site makes and receives an order-token with all data
  */
    describe("POST /v2/orders", () => {
      it("It should makes order and receives an order-token with all data", (done) => {    
        setTimeout(done,500);
        const order = {  
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
      };
        chai.request(server)
          .post('/v2/orders')
          .send(order)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('token');
            response.body.should.have.property('expires');
            response.body.should.have.property('checkoutUrl');
          done();
          })
        })
      })

  /*
    Mandatory check for totalAmount
  */
  describe("POST /v2/orders", () => {
    it("It should check mandatory property for totalAmount", (done) => {    
      const order = {  
        "consumer": {  
                "phoneNumber": "0400000001",
                "givenNames": "Joe",
                "surname": "Consumer",
                "email": "test@scalapay.com"
            },
            "merchant": {
                "redirectConfirmUrl": "https://staging.portal.scalapay.com/success-url",
                "redirectCancelUrl": "https://staging.portal.scalapay.com/failure-url"
            }    
        };
      chai.request(server)
        .post('/v2/orders')
        .send(order)
        .end((err, response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('status').eq("failed");
        done();
        })
      })
    })

  /*
      Mandatory check for consumer
    */
  describe("POST /v2/orders", () => {
    it("It should check mandatory property for consumer", (done) => {    
      const order = {  
            "totalAmount": {  
              "amount": "40.70",
              "currency": "EUR"
          },        
            "merchant": {
                "redirectConfirmUrl": "https://staging.portal.scalapay.com/success-url",
                "redirectCancelUrl": "https://staging.portal.scalapay.com/failure-url"
            }    
        };
      chai.request(server)
        .post('/v2/orders')
        .send(order)
        .end((err, response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('status').eq("failed");
        done();
        })
      })
    })

  /*
      Mandatory check for merchant
    */
   describe("POST /v2/orders", () => {
    it("It should check mandatory property for merchant", (done) => {    
      const order = {  
          "totalAmount": {  
            "amount": "40.70",
            "currency": "EUR"
        },
        "consumer": {  
                "phoneNumber": "0400000001",
                "givenNames": "Joe",
                "surname": "Consumer",
                "email": "test@scalapay.com"
            }
        };
      chai.request(server)
        .post('/v2/orders')
        .send(order)
        .end((err, response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('status').eq("failed");
        done();
        })
      })
    })

});