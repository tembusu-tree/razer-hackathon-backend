import * as jwt from 'jsonwebtoken';

export class JwtService {
  private secret: string;
  private config: {};

  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.config = {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    };
  }

  sign(data: any): string {
    return jwt.sign(data, this.secret, this.config);
  }

  validate(token: string): any {
    jwt.verify(token, this.secret, { ignoreExpiration: false, ...this.config });
    const data = jwt.decode(token);

    return data;
  }
}
