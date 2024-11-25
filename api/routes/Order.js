const express=require('express');
const orderRouter=express.Router();
const Order=require('../models/Order');
const auth=require('../Auth/auth')
orderRouter.post('/', auth, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;

    console.log(orderItems);

    // Check if orderItems exist and are not empty
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).send({ message: 'No order items' });
    }

    // Create a new order
    const order = new Order({
      orderItems,
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
    res.status(500).send({ message: 'Failed to create order', error: error.message });
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
    const order = await Order.findById(req.params.id);
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
