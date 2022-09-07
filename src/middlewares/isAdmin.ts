import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const isAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { user } = request;
  if (user.isAdmin) {
    next();
  } else {
    throw new AppError("User does not have permission");
  }
};
