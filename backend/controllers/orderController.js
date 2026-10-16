
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
 import dotenv from "dotenv";
 dotenv.config();

//global variable
const currency = 'inr'
const deliveryCharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    // Check if the user exists
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    // console.log(newOrder);
    // await userModel.findByIdAndUpdate(userId, cartData);
    
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
   
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order placement failed" });
  }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {

  try {
    
const userId = req.userId;
  const { items, amount, address } = req.body;
  const {origin} = req.headers;

 // Check if the user exists
 const userData = await userModel.findById(userId);
 if (!userData) {
   return res.json({ success: false, message: "User not found" });
 }

 const orderData = {
   userId,
   items,
   amount,
   address,
   paymentMethod: "stripe",
   payment: false,
   date: Date.now(),
 };
const newOrder = new orderModel(orderData);
await newOrder.save();

const line_items = items.map((item)=>({
   price_data:{
    currency:currency,
    product_data:{
      name:item.name
    },
    unit_amount:item.price *100
   },
   quantity:item.quantity
}))
line_items.push({
  
   price_data:{
    currency:currency,
    product_data:{
      name:"Delivery Charges"
    },
    unit_amount:deliveryCharge *100
   },
   quantity:1
})
const session = await stripe.checkout.sessions.create({
  success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
   cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
   line_items,
   mode:'payment',
    payment_method_types: ['card'],
  payment_method_options: {
    card: {
      request_three_d_secure: 'any',
    },
  }
})
res.json({success:true,session_url:session.url})

} catch (error) {
  console.log(error);
    res.json({ success: false, message: error.message });

  }
  
};
// verify stripe
const verifyStripe = async (req,res)=>{
  const userId = req.userId
  const {orderId,success}  = req.body

  try {
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId ,{payment:'true'})
      await orderModel.findByIdAndUpdate(userId ,{cartData:{}})
          res.json({ success: true });

    }

    else{
      await orderModel.findByIdAndDelete(orderId)
     res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    
     res.json({ success: false, message: error.message });

  }
}

// Placing orders using razorpay Method
const placeOrderRazorpay = async (req, res) => {};

//All Orders Data for admin Panel
const allOrders = async (req, res) => {
  try{
    const orders = await orderModel.find({})
    res.json({ success: true,orders});
    // console.log(orders);
    

  } catch (error) {
    console.log(error);
    res.json({ success: false, message:error.message });
  }
};
//User Orders Data for frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.userId; 
    const orders = await orderModel.find({userId})
    res.json({ success: true,orders});
    // console.log(orders);
    

  } catch (error) {
    console.log(error);
    res.json({ success: false, message:error.message });
  }
};
//Update Orders status from Admin Panel
const updateStatus = async (req, res) => {
    try {
    const {orderId,status} = req.body; 
     await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({ success: true,message:"Status Updated"});
    // console.log(orders);
    

  } catch (error) {
    console.log(error);
    res.json({ success: false, message:error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
