import jwt from "jsonwebtoken";
import { User } from "../model/users.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generatehash,
  comparehash,
} from "../util/authUtil.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ where: { username } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedpassword = await generatehash(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedpassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user || !(await comparehash(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
      message: "Logged in successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const accessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Invalid request" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const user = User.findOne({ where: { id: decoded.id } });

        if (!user) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt.sign(
          { user_id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" },
        );

        return res.status(200).json({
          message: "Access token generated successfully",
          accessToken: accessToken,
        });
      },
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
