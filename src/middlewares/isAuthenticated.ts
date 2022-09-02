import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../module/accounts/repositories/implementations/UsersRepository";

export const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing");
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: userId } = verify(token, "aca8698eac2050efa48cc339caad3989");

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(String(userId));
    if (!user) throw new AppError("Invalid token");

    request.user = {
      id: String(userId),
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      isAdmin: user.isAdmin,
      driverLicense: user.driver_license,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 500);
  }
};
