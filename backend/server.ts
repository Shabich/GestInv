import express from 'express';
import routerRoutes from './Produits/produit.route'; 
import cors from 'cors'; 

const app = express();
const port = 3000;

app.use(cors({
  }));

app.use(express.json());
app.use('/api/produits', routerRoutes); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
