import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) { }

  //  public getAll = async (_req: Request, res: Response) => {
  //    const users = await this.userService.getAll();
  //    res.status(200).json(users);
  //  };
  
  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const userCreated = await this.userService.create(user);
    // res.status(StatusCodes.CREATED).json(userCreated);
    if (userCreated.id) {
      const secret = 'seusecretdetoken';
      //      const jwtConfig = {
      //        expiresIn: '7d',
      //        algorithm: 'HS256',
      //      };
      // const token = jwt.sign({ data: user }, secret, jwtConfig);
      const token = jwt.sign({ data: user }, secret);
      res.status(201).json({ token });
    }
  };
}

export default UserController;
