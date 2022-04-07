import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../../configs";

const validateAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "missing header authorization" });
  }

  jwt.verify(token, jwtConfig.secretKey, (e, decoded) => {
    if (e) {
      return res.status(401).json({ error: e.message });
    }
    req.userDecoded = decoded;
    return next();
  });
};

export default validateAuthMiddleware;
