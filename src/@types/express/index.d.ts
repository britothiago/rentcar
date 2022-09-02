declare namespace Express {
  export interface Request {
    user: {
      id: string;
      name: string;
      avatar: string;
      email: string;
      isAdmin: boolean;
      driverLicense: string;
    };
  }
}
