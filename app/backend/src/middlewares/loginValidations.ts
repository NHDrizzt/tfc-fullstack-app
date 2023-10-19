import { NextFunction, Request, Response } from 'express';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class LoginValidations {
  private static validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  static validateLoginFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(mapStatusHTTP('BAD_REQUEST'))
        .json({ message: 'All fields must be filled' });
    }

    if (!LoginValidations.validateEmail(email) || password.length < 6) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Invalid email or password' });
    }
    next();
  }
}
