import Jwt from "jsonwebtoken";

export const sendCookie = (User, res, message, statusCode = 200) => {
  const token = Jwt.sign({ _id: User._id }, process.env.PRIVATE_KEY);
  console.log(process.env.NODE_ENV)
  console.log(process.env.NODE_ENV === 'devlopment')

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "devlopment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "devlopment" ? false : true,
    })
    .json({
      succuss: true,
      message,
    });
};
