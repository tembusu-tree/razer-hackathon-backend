import { JwtService } from '../lib/jwt/jwt.service';

export const checkToken = (req, res, next) => {
  let token = req?.headers['x-access-token'] || req?.header('Authorization');
  if (token?.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    const jwtService = new JwtService();
    const result = jwtService.validate(token);
    if (result) {
      req.decoded = result.data;
      next();
    } else {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
  } else {
    return res.status(401).json({
      message: 'Auth token is not supplied',
    });
  }
};
