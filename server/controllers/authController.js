const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

//register controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //email verification
    const verifyLink = `http://localhost:5000/verify/${user._id}`;

    await sendEmail(
      user.email,
      "verify your account",
      `
    <h2>Welcome ${user.name}</h2>

    <p>Please verify your email.</p>

    <a href="${verifyLink}">
        Verify Account
    </a>
    `
    );


    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  }

  catch (error) {
     console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(                  //pasword encrypt
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

     if(!user.isVerified){
      return res.status(400).json({
        success:false,
        message:"please your email verified first",
      })
     }    

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,                           //token
     user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
  },
    });
    console.log(user.role);

    console.log("TOKEN =", token);
  }

  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//email verification
exports.verifyEmail = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }

        user.isVerified = true;

        await user.save();

        res.send(`
            <h2>Email Verified Successfully ✅</h2>
            <p>You can now login.</p>
        `);

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

//admin dashboard
// Get All Users with Pagination

exports.getAllUsers = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = 5;

        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments();

        const users = await User.find()

            .select("-password")

            .skip(skip)

            .limit(limit);

        res.json({

            success: true,

            users,

            currentPage: page,

            totalPages: Math.ceil(totalUsers / limit),

            totalUsers,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
//delete admin dashboard user
exports.deleteUser= async(req,res)=>{
  try{
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success:true,
      message:"User Deleted Successfully",
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message,
    });
  }
};

//forgot password
exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        // First find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Then create token
        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // Then create link
        const resetLink =
            `http://localhost:5173/reset-password/${resetToken}`;

        // Then send email
        await sendEmail(
            user.email,
            "Reset Password",
            `
            <h2>Hello ${user.name}</h2>
            <p>Click below to reset password</p>
            <a href="${resetLink}">Reset Password</a>
            `
        );

        res.json({
            success: true,
            message: "Reset Password Link Sent Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

//reset password
// Reset Password
exports.resetPassword = async (req, res) => {

    try {

        const { token } = req.params;
        const { password } = req.body;

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find User
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Hash New Password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;

        await user.save();

        res.json({
            success: true,
            message: "Password Reset Successfully",
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};