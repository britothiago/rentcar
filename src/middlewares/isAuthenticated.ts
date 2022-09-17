import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../module/accounts/repositories/implementations/UsersRepository";
import { UsersTokenRepository } from "../module/accounts/repositories/implementations/UsersTokenRepository";

export const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;
  const usersTokenRepository = new UsersTokenRepository();
  const usersRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: userId } = verify(token, process.env.REFRESH_TOKEN_KEY);

    const user = await usersTokenRepository.findByUserIdAndRefreshToken(
      String(userId),
      token
    );
    if (!user) throw new AppError("Invalid token");

    const userInfo = await usersRepository.findById(String(userId));

    request.user = {
      id: String(userId),
      name: userInfo.name,
      avatar: userInfo.avatar,
      email: userInfo.email,
      isAdmin: userInfo.isAdmin,
      driverLicense: userInfo.driver_license,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 500);
  }
};
