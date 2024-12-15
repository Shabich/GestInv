import { Router } from 'express';
import { ProduitController } from './produit.controller';

const routerRoutes = Router();

routerRoutes.get('/', ProduitController.getAll);
routerRoutes.get('/:id', ProduitController.getById);
routerRoutes.post('/', ProduitController.create);
routerRoutes.put('/:id', ProduitController.update);
routerRoutes.delete('/:id', ProduitController.delete);

export default routerRoutes;
