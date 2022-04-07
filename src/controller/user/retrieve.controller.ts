import { Request, Response } from "express";

import { UserRepository } from "../../repositories";
import { User } from "../../entities/User";

const retrieveUserController = async (_: Request, res: Response) => {
  const allUsers: User[] = await new UserRepository().findUsers();
	const usersWithOutPassword = JSON.parse(JSON.stringify(allUsers))

	usersWithOutPassword.forEach(item => {
		delete item.password
	});

  return res.status(200).json(usersWithOutPassword);
};

export default retrieveUserController;
