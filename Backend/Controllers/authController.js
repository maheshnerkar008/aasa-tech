const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    // validation
    if (!userName || !email || !password) {
      return res.status(500).send({
        sucess: false,
        msg: "please provide all fields",
      });
    }
    // check user

    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res.status(500).send({
        sucess: false,
        msg: "user Allready Exist",
      });
    }
    // hashed password

    //create new user

    const newUser = await User.create({
      userName,
      email,
      password
    });
    res.status(200).json({
      sucess: true,
      msg: " Sucessfully registered",
      newUser,
    });
  } catch (err) {
    res.status(500).json({ "internal server error": err });
  }
};

// login

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    // validation
    if (!email || !password) {
      return res.status(500).json({
        sucess: false,
        msg: "please provide email or password",
      });
    }
    // check user
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        sucess: false,
        msg: "user not found",
      });
    }
    // comapre password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .json({ sucess: false, msg: "invalid credentials" });
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ "internal server error": err });
  }
};

module.exports = { registerController, loginController };
