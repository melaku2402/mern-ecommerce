import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // 1. Get the token from the Authorization header (standard practice)
    const authHeader = req.headers.authorization;

    // 2. Check if the header or token is missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    // 3. Extract the token by splitting the "Bearer " prefix
const token = req.headers.authorization.split(" ")[1];
    // 4. Verify the token using your secret key
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Add the user's ID to the request object
    req.userId = token_decode.id;

    // 6. Call next() to pass the request to the next function
    next();
  } catch (error) {
    // This catch block handles any errors during token verification
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

export default authUser;

// import jwt from 'jsonwebtoken'

// const authUser = async (req,res,next) =>{

//      const token = req.body
//             console.log(req.body);
//      if(!token){
//         return res.json({success:false, message:'Not Authorized Login again'})

//         try {
//             const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//             req.body.userId = token_decode.id

//             next()

//         } catch (error) {
//             console.log(error);
//                     return res.json({
//                       success: false,
//                       message: error.message
//                     });

//         }
//      }
// }
// export default authUser
