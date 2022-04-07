import { NextFunction, Request, Response } from "express";

const verifyAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIsAdmin = req.userDecoded.user.isAdm;
  if (!userIsAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }
	req.userIsAdmin = userIsAdmin

  return next();
};

export default verifyAdmMiddleware;
