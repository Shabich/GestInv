import { Router } from 'express';
import { pharmacieController } from './pharmacie.controller';
import { verifyToken } from '../Authent/auth.middleware';

const pharmacieRoute = Router();

pharmacieRoute.get('/', pharmacieController.getAll);
pharmacieRoute.get('/:id', pharmacieController.getById)
pharmacieRoute.post('/', pharmacieController.create)
pharmacieRoute.put('/:id',pharmacieController.update)
pharmacieRoute.delete('/:id', pharmacieController.delete)

export default pharmacieRoute
;
