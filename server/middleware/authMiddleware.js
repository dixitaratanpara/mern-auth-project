const jwt = require("jsonwebtoken");

const auth =async(req, res, next)=>{
    try{

        const token = req.headers.authorization;

        if(!token)
        {
           return res.status(401).json({
                  success: false,
                  message: "No token provided",
            });
        }

        const decoded =jwt.verify(
            token,
          process.env.JWT_SECRET
        );

        req.user= decoded;

        next();
    }

    catch(error){
        res.status(401).json({
            success:false,
            message:"invalid token",
        });
    }
};

module.exports= auth;