import { NextFunction, Request, Response } from 'express';
import ResponseFactory from '../factories/ResponseFactroy';

type UserToken = {
  name: String;
  role: String;
};
type UseredRequest = Request & { user: UserToken };
type RoleParser = (
  req: UseredRequest,
  res: Response,
  next: NextFunction,
) => void;
type AllowList = String[];

// whitelist for allowed roles to access an endpoint
// blacklist to ban specific role from using an endpoint
export default function roleChecker(
  whitelist: AllowList = [],
  blacklist: AllowList = [],
): RoleParser {
  return (req: UseredRequest, res: Response, next: NextFunction) => {
    try {
      let userRole = req.user?.role;
      if (blacklist.includes(userRole) || !whitelist.length) {
        const status = 401;
        return res
          .status(status)
          .json({ ...ResponseFactory.create(status, 'Unauthorized B**ch') });
      }
      if (whitelist.includes(userRole)) {
        next();
      }
    } catch (error) {
      console.error(error);
    }
  };
}
