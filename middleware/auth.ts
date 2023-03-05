import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET as string;

const auth = async (req: Request, res: Response, next: () => void) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decodeData = (await jwt.verify(token, secret)) as any;
      req.body.userId = decodeData.id;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};

export default auth;
