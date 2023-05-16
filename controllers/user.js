import { user } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

// --------------------------  creating user  -----------------------------//
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let User = await user.findOne({ email });
    if (User) {
      return res.status(404).json({
        succuss: false,
        messaeg: "User already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    User = await user.create({ name, email, password: hashPassword });
    // send cookie is a function imported from features presented inside utils
    sendCookie(User, res, "Resitered Successfully", 201);
  } catch (error) {
    next(error);
  }
};
// ----------------------  creating login functionality  -------------------//
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    /* by dafault we can't acces password because of select functinality in database if we want then
    we have to specify in select that what are the fields we want */
    let User = await user.findOne({ email }).select("+password");
    if (!User) {
      return res.status(400).json({
        succuss: false,
        messaeg: "Invalid email or password",
      });
    }
    const isMatch = bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({
        succuss: false,
        messaeg: "Invalid email or password",
      });
    }
    sendCookie(User, res, `Welcome back ${User.name}`, 200);
  } catch (error) {
    next(error);
  }
};
// ----------------------  creating logOut functionality  -------------------//
export const logOut = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "devlopment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "devlopment" ? false : true,
      })
      .json({
        succuss: true,
        messaeg: "Log Out Successfully",
      });
  } catch (error) {
    next(error);
  }
};

// --------------------------  get Profile -----------------------------//
export const getMyProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.User,
    });
  } catch (error) {
    next(error);
  }
};
