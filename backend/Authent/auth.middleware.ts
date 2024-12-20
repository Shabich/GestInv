import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
}

export const verifyToken = (req: any, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token d\'acces manquant' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Pas de token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'secretKey') as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'token invalide ou déjà expiré' });
  }
};
