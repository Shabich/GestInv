import jwt from 'jsonwebtoken'
import { getUserByEmail, createUser } from './auth.model'

export const signup = async (
  email: string,
  password: string,
  nom: string,
  prenom: string,
  adresse: string,
  num_tel: string,
  date_naissance: Date
): Promise<number> => {
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    throw new Error('Utilisateur déjà existant')
  }
  const userId = await createUser(email, password, nom, prenom, adresse, num_tel, date_naissance)
  return userId
}

export const signin = async (email: string, password: string) => {
  const user = await getUserByEmail(email)
  if (!user) {
    throw new Error("Verifiez le mot de passe et l'adresse mail")
  }

  const isMatch = await require('bcryptjs').compare(password, user.password)
  if (!isMatch) {
    throw new Error("Verifiez le mot de passe et l'adresse mail")
  }

  const token = jwt.sign({ id: user.id_t_user }, 'secretKey', { expiresIn: '1h' })
  
  try {
    const decoded = jwt.verify(token, 'secretKey');
    if (typeof decoded !== "string") {
      console.log("ID de l'utilisateur :", decoded.id); 
  }
    console.log("Token décodé :", decoded);
} catch (err) {
    console.error("Erreur :", err);
}


  return token
}
