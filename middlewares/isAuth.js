import Jwt from "jsonwebtoken"
import { user } from "../models/user.js";

export const isAuthenticated = async (req,res,next)=>{
  // by using cookie-parser bundler we can acces ans set the cookies
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      succuss: false,
      message: "Login First",
    });
  }
//   always give privete kye while decoding if set, else no need
  const decoded = Jwt.verify(token, process.env.PRIVATE_KEY);
  req.User = await user.findById(decoded._id);
  next();
}