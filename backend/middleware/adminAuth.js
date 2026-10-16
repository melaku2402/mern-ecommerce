import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next)=>{
    try {
      const {token} =req.headers // req.body
      if(!token){
        return res.json({success:false,message:"Not Authorized login  Again no have token from admin" }) 
      }
      const token_decode = jwt.verify(token,process.env.JWT_SECRET)
      if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
                return res.json({success:false,message:"Not Authorized login  Again admin"}) 
      }
      next()
    } catch (error) {
      console.log(error);
        
    }
}

export default adminAuth
