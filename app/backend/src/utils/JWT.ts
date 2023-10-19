import { JwtPayload, Secret, SignOptions, verify, sign } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '24h',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, JWT.secret, JWT.jwtConfig);
  }

  static verify(token: string): JwtPayload | boolean {
    const payload = verify(token, JWT.secret) as JwtPayload;
    return payload.role;
  }
}
