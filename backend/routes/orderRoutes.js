const express = require('express');
const router = express.Router();
const { createOrder, getOrderDetails } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/:orderNumber', getOrderDetails);

module.exports = router;
