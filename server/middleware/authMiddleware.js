const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        console.log("AUTH HEADER =", authHeader);

        // Bearer remove
        const token = authHeader.replace("Bearer ", "");

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED =", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = auth;