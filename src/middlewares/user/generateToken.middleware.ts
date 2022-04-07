import { NextFunction, Request, Response } from "express";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../../repositories";
import { User } from "../../entities/User";
import jwtConfig from "../../configs";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await new UserRepository().findByEmail(
      (req.validated as User).email
    );

    if (!user || !compareSync((req.validated as User).password, user.password)) {
      return res.status(401).json({ error: "invalid e-mail or password" });
    }

    const token: string = sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    req.token = token;
		
		return next()
  } catch (e) {
    return res.status(400).json(e);
  }
};

export default validateToken;
