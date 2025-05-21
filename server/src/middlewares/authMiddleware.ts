import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: number;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authMiddleware = (roles: string[] | string = []) => {
  const allowedRoles = typeof roles === 'string' ? [roles] : roles;

  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      req.user = decoded;

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        res.status(403).json({ message: 'Forbidden: Access denied' });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};

export default authMiddleware;
