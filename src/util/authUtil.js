import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generatehash = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparehash = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (user) => {
  return jwt.sign({ user_id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ user_id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
