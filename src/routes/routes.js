const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const ajv = new Ajv();

//Import controllers which hold CRUD methods foreach models
const controllers = require('../controllers/controllers');

//importing schema
const orderSchema = require('../schema/orderSchema.json');

function errorResponse(schemaErrors) {
  let errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message
    }
  })
  return {
    status: 'failed',
    errors: errors
  }
}

let validateSchema = (schema) => {
  return (req, res, next) => {
    let valid = ajv.validate(schema, req.body);
    if (!valid) {
      return res.status(422).send(errorResponse(ajv.errors));
    }
    next();
  }
}

//configurations
router.get('/configurations', controllers.getConfigurations);

//orders
router.post('/orders', validateSchema(orderSchema), controllers.createOrder);

module.exports = router;