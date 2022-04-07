import { Request, Response } from "express";

const retrieveProfileController = (req: Request, res: Response) => {
  const userProfile = req.userDecoded.user;
	const user = JSON.parse(JSON.stringify(userProfile))
	delete user.password

	return res.status(200).json(user);
};

export default retrieveProfileController;
