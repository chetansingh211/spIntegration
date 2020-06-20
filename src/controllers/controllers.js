const axios = require('axios');
const config = require('../config/config.json');


async function getConfigurations(req, res) {
    try {
        const result = await axios.get(config.spUrl+'/v2/configurations', {
            headers: {
                'Authorization' : `Bearer ${config.token}`
            }
        });

        if(result.status == 200) {
            res.status(200).json(result.data);
        }
    } catch(error) {
        res.status(500).json(error);
    }
}


async function createOrder(req, res) {
    try {
        const result = await axios.post(config.spUrl+'/v2/orders', req.body, {
            headers: {
                'Authorization' : `Bearer ${config.token}`
            }
        });
        if(result.status == 200) {
            res.status(200).json(result.data);
        }
    } catch(error) {
        res.status(500).json(error);
    }
}

module.exports.getConfigurations = getConfigurations;
module.exports.createOrder = createOrder;