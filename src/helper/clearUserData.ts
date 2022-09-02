import { User } from "../module/accounts/entities/User";

interface IResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

export const clearUserData = (user: User): IResponse => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
  };
};
