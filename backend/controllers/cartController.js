import userModel from "../models/userModel.js"

//add product to user cart
// const addToCart = async (req,res) =>{
    
//     try {
//      const userId = req.userId; // Get userId from the middleware
//      const { itemId, size } = req.body;

//      const userData = await userModel.findById(userId);
//       // console.log(cartData.itemId);

//       if (!cartData) {
//          { return res.json({ success: false, message: "User not found" });
//          };
//       }
//            if (!cartData) {
//              cartData = {};
//              }

//       if (cartData[itemId]) {
//         if (cartData[itemId][size]) {
//           cartData[itemId][size] += 1;
//         } else {
//           cartData[itemId][size] = 1;
//         }
//       } else {
//         cartData[itemId] = {};
//         cartData[itemId][size] = 1;
//       }

//       await userModel.findByIdAndUpdate(userId, { cartData });
//       res.json({ success: true, message: "Added To Cart" });
//     } catch (error) {
//        console.log(error);
//        res.json({ success: false, message:error.message });

//     }
// }



//add product to user cart
const addToCart = async (req, res) => {
  try {
    // Get userId from the middleware, not the request body
    const userId = req.userId;
    const { itemId, size } = req.body;
    const userData = await userModel.findById(userId); // Check if the user exists

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData; // Ensure cartData is an object, even if it's a new user
    if (!cartData) {
      cartData = {};
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//update user cart
const updateCart = async (req,res) =>{

    try {
        const userId = req.userId; // Get the user ID from the middleware, NOT the request body
        const {itemId, size, quantity} = req.body;
        
        const userData = await userModel.findById(userId);

        // Check if the user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        let cartData = userData.cartData;

        // Check if the cartData, item, and size exist before updating
        if (cartData && cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
        } else {
            return res.json({ success: false, message: "Item not found in cart" });
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//update user cart
// const updateCart = async (req,res) =>{

//     try {

//         const {userId,itemId,size, quantity} = req.body
//         console.log("Received data:", req.body);
//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData
//           console.log(cartData);
          
//          cartData[itemId][size] = quantity
//           await userModel.findByIdAndUpdate(userId, { cartData });
//           res.json({ success: true, message: " Cart Updated  " });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });

        
//     }
// }


//get  to user cart
const getUserCart = async (req,res) =>{
    
    try {
        //  const { userId} = req.body;
           const userId = req.userId; 
         const userData = await userModel.findById(userId);
         let cartData = await userData.cartData;
           
          res.json({ success: true,cartData});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
 
    }

}


export {addToCart,updateCart,getUserCart}