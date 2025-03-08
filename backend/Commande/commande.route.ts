import { Router } from 'express';
import { CommandeController } from './commande.controller';
import { verifyToken } from '../Authent/auth.middleware';

const commandeRoute = Router();

commandeRoute.get('/', CommandeController.getAll);
// commandeRoute.get('/:id', CommandeController.getAll)
commandeRoute.get('/:id', CommandeController.getByUserId)


  
export default commandeRoute;
