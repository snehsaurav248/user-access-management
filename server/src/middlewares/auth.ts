// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../entities/User';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      role: UserRole;
    };

    req.user = decoded; // TypeScript doesn't know this unless we use the custom interface

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
