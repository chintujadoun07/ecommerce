const express=require('express');
const orderRouter=express.Router();
const Order=require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const auth=require('../Auth/auth')

function getNumericEnv(name, fallback) {
  const raw = process.env[name];
  const value = raw === undefined ? fallback : Number(raw);

  return Number.isFinite(value) ? value : fallback;
}

function createBadRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

orderRouter.post('/', auth, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Check if orderItems exist and are not empty
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).send({ message: 'No order items' });
    }

    const productIds = orderItems.map((item) => item.product);
    const hasInvalidProductId = productIds.some(
      (productId) => !mongoose.Types.ObjectId.isValid(productId)
    );

    if (hasInvalidProductId) {
      return res.status(400).send({ message: 'Invalid product in order items' });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    const productsById = new Map(
      products.map((product) => [String(product._id), product])
    );

    const normalizedOrderItems = orderItems.map((item) => {
      const product = productsById.get(String(item.product));
      const qty = Number(item.qty);

      if (!product) {
        throw createBadRequest(`Product not found: ${item.product}`);
      }

      if (!Number.isInteger(qty) || qty < 1) {
        throw createBadRequest(`Invalid quantity for product: ${item.product}`);
      }

      if (product.countInStock < qty) {
        throw createBadRequest(`Insufficient stock for product: ${product.name}`);
      }

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      };
    });

    const itemsPrice = Number(
      normalizedOrderItems
        .reduce((sum, item) => sum + item.price * item.qty, 0)
        .toFixed(2)
    );
    const shippingBase = getNumericEnv('DEFAULT_SHIPPING_PRICE', 0);
    const taxRate = getNumericEnv('TAX_RATE', 0);
    const shippingPrice = itemsPrice > 0 ? shippingBase : 0;
    const taxPrice = Number((itemsPrice * taxRate).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    // Create a new order
    const order = new Order({
      orderItems: normalizedOrderItems,
      user: req.userId,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    });

    // Save the order in the database
    const newOrder = await order.save();
    res.status(201).send({ order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(error.statusCode || 500).send({
      message: error.statusCode ? error.message : 'Failed to create order',
      error: error.message,
    });
  }
});



 // const newOrder =  new UserOrder({
      //   userId: '1',
      //   customerId: '1',
      //   productId: '652b2e458077fd5b243a06ad',
      //   quantity: 1,
      //   subtotal: 12 / 100,
      //   total: 12 / 100,
      //   payment_status: '3',
      // });

//check api

      // {
      //   "orderItems": [
      //     {
           
      //        "name": "Lorem anim anim",
      //   "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52c951e30dcb4ff1bfdfd053405a6f75_9366/Samba_Shoes_Green_IG1243_01_standard.jpg",
      //   "qty":"1",  
      //   "price": 98,
      //   "product":"66e85a855cf64256e4d947b8"
       
        
      //     }
      
      //   ],
       
      //   "shippingAddress": {
      //     "address": "123 Main St",
      //     "city": "New York",
      //     "postalCode": "10001",
      //     "country": "USA"
      //   },
      //   "paymentMethod": "PayPal",
      //   "shippingPrice": 10.00,
      //   "taxPrice": 5.50,
      //   "totalPrice": 142.49,
      //   "price": 132.49
      // }
      


//order detail
// Get order by ID
orderRouter.get("/:id", auth,async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to retrieve order", error: error.message });
  }
});

// Update order status for payment
orderRouter.put("/:order_id", auth,async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.create_time,
        // email_address: req.body.payer.email_address,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save(); // Ensure you await this

      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    console.error("Error updating order payment status:", error);
    res.status(500).json({ message: "Failed to update payment status", error: error.message });
  }
});

// Get list of orders for the user
orderRouter.get("/",auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ _id: -1 });
    if (orders && orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "Orders Not Found" });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
  }
});

  
  
  //stripe payment 
  
  
  
  module.exports =orderRouter;
