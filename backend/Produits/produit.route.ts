import { Router } from 'express';
import { ProduitController } from './produit.controller';
import { verifyToken } from '../Authent/auth.middleware';

const routerRoutes = Router();

routerRoutes.get('/', verifyToken, ProduitController.getAll);
routerRoutes.get('/:id', verifyToken, ProduitController.getById);
routerRoutes.post('/', verifyToken, ProduitController.create);
routerRoutes.put('/:id', verifyToken, ProduitController.update);
routerRoutes.delete('/:id', verifyToken, ProduitController.delete);




  
export default routerRoutes;
