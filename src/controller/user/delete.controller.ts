import { Request, Response } from "express";

import { UserRepository } from "../../repositories";
import findUserByUuid from "../../utils/findUserByUuid.util";

const deleteUserController = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const decodedUser = req.userDecoded.user;
	const findUser = await findUserByUuid(uuid)

  if (!decodedUser.isAdm && uuid !== decodedUser.uuid) {
    return res.status(401).json({ error: "Missing admin permissions" });
  }

  if (!findUser) {
    return res.status(404).json({ error: "User not found" });
  }
  
	await new UserRepository().deleteUser(uuid);

  return res.status(200).json({ message: "User deleted with success" });
};

export default deleteUserController;
