import { Request, Response } from "express";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

import findUserByUuid from "../../utils/findUserByUuid.util";

const updateUserController = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const data = req.body;
  const decodedUser = req.userDecoded.user;
  const findUser = await findUserByUuid(uuid);
  data.updatedOn = new Date();

  if (!decodedUser.isAdm && uuid !== decodedUser.uuid) {
    return res.status(401).json({ error: "Missing admin permissions" });
  }

  if (!findUser) {
    return res.status(404).json({ error: "User not found" });
  }

  if (Object.keys(data).includes("isAdm")) {
    return res.status(401).json({ error: "You cannot change the isAdm field" });
  }

  await new UserRepository().updateUser(uuid, data);
  const user = await new UserRepository().findByEmail((await findUserByUuid(uuid) as User).email);
  const updatedUser = JSON.parse(JSON.stringify(user));
  delete updatedUser.password;
  return res.status(200).json(updatedUser);
};

export default updateUserController;
