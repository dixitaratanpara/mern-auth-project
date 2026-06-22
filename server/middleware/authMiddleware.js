const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }
console.log("JWT_SECRET =", process.env.JWT_SECRET);
        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    }

    catch (error) {

    console.log(error);

    res.status(401).json({
        success: false,
        message: error.message,
    });
}
};

module.exports = auth;