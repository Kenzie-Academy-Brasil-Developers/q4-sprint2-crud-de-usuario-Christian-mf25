import { Request, Response } from "express";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user: User = await new UserRepository().saveUser(
      req.validated as User
    );

    const userToReturn = JSON.parse(JSON.stringify(user));
    delete userToReturn.password;

    return res.status(201).json(userToReturn);
  } catch (e) {
    return res
      .status(400)
      .json({ error: `E-mail ${req.body.email} already registered` });
  }
};

export default createUserController;
