
import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'



const orderRoute = express.Router()
// admin features
orderRoute.post('/list',adminAuth,allOrders)
orderRoute.post('/status',adminAuth,updateStatus)

//payment features
orderRoute.post('/place',authUser,placeOrder)
orderRoute.post('/stripe',authUser,placeOrderStripe)
orderRoute.post('/razorpay',authUser,placeOrderRazorpay)


//user orders
orderRoute.post('/userorders',authUser,userOrders)
// verify Stripe
orderRoute.post('/verifyStripe',authUser,verifyStripe)

export default orderRoute