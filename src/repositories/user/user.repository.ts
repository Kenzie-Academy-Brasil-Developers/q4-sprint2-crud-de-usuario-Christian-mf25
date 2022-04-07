import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";

interface UserRepo {
  saveUser: (user: User) => Promise<User>;
  findUsers: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User>;
}

class UserRepository implements UserRepo {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  saveUser = async (user: User) => await this.ormRepository.save(user);
  findUsers = async () => await this.ormRepository.find();
  findByEmail = async (email: string) => {
    return await this.ormRepository.findOne({ where: { email } });
  };
  deleteUser = async (uuid: string) => {
    return await this.ormRepository.delete({ uuid });
  };
  updateUser = async (uuid: string, data) =>
    await this.ormRepository.update(uuid, data);
}

export default UserRepository;
