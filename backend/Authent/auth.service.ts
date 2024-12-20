import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from './auth.model';

export const signup = async (email: string, password: string): Promise<number> => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('Utilisateur déjà existant');
  }
  const userId = await createUser(email, password);
  return userId;
};

export const signin = async (email: string, password: string): Promise<string> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Verifiez le mot de passe et l\'adresse mail');
  }

  const isMatch = await require('bcryptjs').compare(password, user.password);
  if (!isMatch) {
    throw new Error('Verifiez le mot de passe et l\'adresse mail');
  }

  const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
  return token;
};
