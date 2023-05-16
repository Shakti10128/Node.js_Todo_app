import express from "express";
import {
  register,
  login,
  getMyProfile,
  logOut,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

export const userRoutes = express.Router();

// create new user
userRoutes.get("/me",isAuthenticated,getMyProfile);
userRoutes.get("/logout", logOut);
userRoutes.post("/new", register);
userRoutes.post("/login", login);


export default userRoutes;
