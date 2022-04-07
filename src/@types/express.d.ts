import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      validated: User;
      token: string;
      userDecoded: any;
      userIsAdmin: any;
    }
  }
}
