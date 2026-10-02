const Order = require('../models/Order');
const { isDbConnected, getMemoryOrders, addMemoryOrder } = require('../config/db');

// @desc    Create a new royal book order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      shippingAddress,
      items,
      totalAmount,
      currency,
      couponCode,
      paymentMethod
    } = req.body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide patron name, email and items' });
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `SPV-ROYAL-${Date.now().toString().slice(-4)}-${randomSuffix}`;

    let discountApplied = 0;
    if (couponCode && (couponCode.toUpperCase() === 'RAJA20' || couponCode.toUpperCase() === 'BOOK20')) {
      discountApplied = totalAmount * 0.20;
    }

    const orderData = {
      orderNumber,
      customerName,
      customerEmail,
      shippingAddress: shippingAddress || {
        addressLine: "Imperial Palace Way",
        city: "Hyderabad / Bengaluru",
        state: "Telangana / Karnataka",
        postalCode: "500001",
        country: "India"
      },
      items,
      totalAmount: Math.max(0, totalAmount - discountApplied),
      currency: currency || "INR",
      discountApplied,
      couponCode: couponCode || "",
      paymentMethod: paymentMethod || "UPI (Google Pay / PhonePe)",
      paymentStatus: "Completed (Sanctified)",
      orderStatus: "Confirmed - Preparing Royal Dispatch",
      createdAt: new Date()
    };

    if (isDbConnected()) {
      const order = await Order.create(orderData);
      return res.status(201).json({ success: true, message: 'Royal order placed successfully', data: order });
    } else {
      const savedOrder = addMemoryOrder({ ...orderData, _id: `ord-${Date.now()}` });
      return res.status(201).json({ success: true, message: 'Royal order placed successfully', data: savedOrder });
    }
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to complete royal order' });
  }
};

// @desc    Get order details by orderNumber or ID
// @route   GET /api/orders/:orderNumber
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    if (isDbConnected()) {
      const order = await Order.findOne({
        $or: [{ orderNumber: orderNumber }, { _id: orderNumber }]
      });
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order receipt not found' });
      }
      return res.json({ success: true, data: order });
    } else {
      const order = getMemoryOrders().find(
        o => o.orderNumber === orderNumber || o._id === orderNumber
      );
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order receipt not found' });
      }
      return res.json({ success: true, data: order });
    }
  } catch (error) {
    console.error('Error finding order:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve order' });
  }
};
