const express = require("express");

const router = express.Router();
const User = require('./models/Users')
const users = require("./data/Users")
const product=require('./data/Products')
const Product=require(('./models/Product'))

// router.post("/users", async (req, res) => {
//   try {
//     // Clear existing users and insert new ones
//     await User.deleteMany({});
//     const UserSeeder = await User.insertMany(users);
//     res.status(200).send({ UserSeeder });
//   } catch (error) {
//     // Catch and send any errors that occur
//     console.error(error);
//     res.status(500).send({ error: "An error occurred while seeding users" });
//   }
// });

// router.post("/product",async(req,res)=>{// after post
router.post("/product",async(req,res)=>{
  try{
await  Product.deleteMany({});
const  ProductSeeder = await Product.insertMany(product);
res.status(200).send({ ProductSeeder });
  }catch(error){
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching products" });
  }
})

module.exports = router;