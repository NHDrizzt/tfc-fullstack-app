import { NextFunction, Request, Response } from 'express';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';

const invalidTokenMessage = 'Token must be a valid token';

export default class JwtValidations {
  static validateToken(req: Request, res: Response, n: NextFunction, r = true): Response | void {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = authorization.split(' ')[1];
    try {
      const decoded = JWT.verify(token);
      if (!decoded) {
        return res.status(mapStatusHTTP('UNAUTHORIZED'))
          .json({ message: invalidTokenMessage });
      }
      if (r) {
        return res.status(mapStatusHTTP('SUCCESSFUL')).json({ role: decoded });
      }
      n();
    } catch (e) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: invalidTokenMessage });
    }
  }

  static validateTokenWithoutRole(req: Request, res: Response, nex: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }
    const token = authorization.split(' ')[1];
    try {
      const decoded = JWT.verify(token);
      if (!decoded) {
        return res.status(mapStatusHTTP('UNAUTHORIZED'))
          .json({ message: invalidTokenMessage });
      }
      nex();
    } catch (e) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: invalidTokenMessage });
    }
  }
}
