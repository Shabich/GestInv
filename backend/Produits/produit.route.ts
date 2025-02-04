import { Router } from 'express';
import { ProduitController } from './produit.controller';
import { verifyToken } from '../Authent/auth.middleware';

const produitRoute = Router();

produitRoute.get('/', ProduitController.getAll);
produitRoute.get('/:id', verifyToken, ProduitController.getById);
produitRoute.post('/', verifyToken, ProduitController.create);
produitRoute.put('/:id', verifyToken, ProduitController.update);
produitRoute.delete('/:id', verifyToken, ProduitController.delete);




  
export default produitRoute;
