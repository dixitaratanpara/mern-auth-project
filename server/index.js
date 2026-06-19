require("dotenv").config();

const express= require("express");
const mongoose = require("mongoose");
const User= require("./models/User");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const auth= require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const multer = require("multer");
const path = require("path");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/",authRoutes);



//server request
app.get("/",(req,res)=>{
    res.send("server running successfully");
});

// //register request
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

//login request
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(                  //pasword encrypt
//       password,
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }
    
//     const token= jwt.sign(
//       {id:user._id},
//       "mysecretkey",
//       {expiresIn: "1d"},
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       token,                           //token
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

app.get("/profile" , auth ,async(req,res)=>{
     try {
 
    const user = await User.findById(req.user.id)
      .select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});

app.put("/profile", auth, async (req, res) => {

  try {

    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
      },
      {
        new: true,
      }
    ).select("-password");

    res.json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

});

app.delete("/profile", auth, async (req, res) => {
  try {

    await User.findByIdAndDelete(req.user.id);

    res.json({
      success: true,
      message: "Account Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});



app.put("/change-password", auth, async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old Password Incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        res.json({
            success: true,
            message: "Password Changed Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
});

//profile picture
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
});
app.use("/uploads",
    express.static("uploads")
);
app.put(
    "/upload-profile-image",
    auth,
    upload.single("image"),

    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                );

            user.profileImage =
                req.file.filename;

            await user.save();

            res.json({
                success: true,
                image:
                    req.file.filename,
            });

        }

        catch (error) {

            res.status(500).json({
                success: false,
                message: "Upload Failed",
            });

        }
    }
);

//mongodb connection
mongoose
     .connect("mongodb://127.0.0.1:27017/mernAuthDb")
     .then(()=>{
        console.log("MongoDB Connected");
     })

     .catch((err)=>{
        console.log(err);
     });


app.listen(5000,()=>{
     console.log("server running on port 5000");
});