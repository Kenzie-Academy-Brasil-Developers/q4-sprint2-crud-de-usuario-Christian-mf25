import { User } from "../entities/User";
import { UserRepository } from "../repositories";

const findUserByUuid = async (uuid) => {
  const users: User[] = await new UserRepository().findUsers();
  const findUser = users.find((item) => item.uuid === uuid);

  return findUser;
};

export default findUserByUuid;
