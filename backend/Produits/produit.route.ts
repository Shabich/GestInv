import { Router } from 'express';
import { ProduitController } from './produit.controller';
import { verifyToken } from '../Authent/auth.middleware';

const produitRoute = Router();

produitRoute.get('/', ProduitController.getAll);
produitRoute.get('/categorie', ProduitController.getAllCategorie);
produitRoute.get('/search/:text', ProduitController.getBySearch);
produitRoute.get('/categorie/:id', ProduitController.getAllById);
produitRoute.get('/:id', verifyToken, ProduitController.getById);
produitRoute.post('/', verifyToken, ProduitController.create);
produitRoute.put('/:id', verifyToken, ProduitController.update);
produitRoute.delete('/:id', verifyToken, ProduitController.delete);


  
export default produitRoute;
