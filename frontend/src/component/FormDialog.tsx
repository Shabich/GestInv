import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';

interface FormDialogProps {
  id: number | null;
  open: boolean;
  handleClose: () => void;
}

const forme = [
  {
    value: 'orale',
    label: 'orale',
  },
  {
    value: 'dermique',
    label: 'dermique',
  },
  {
    value: 'injectable',
    label: 'injectable',
  },
  {
    value: 'médicamenteuse',
    label: 'médicamenteuse',
  },
];


const FormDialog: React.FC<FormDialogProps> = ({ open, id, handleClose }) => {
  const [produit, setProduit] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (id !== null && open) {
      const getProduit = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:3000/api/produits/${id}`);
          if (!response.ok) {
            throw new Error('Problème avec la requête');
          }
          const data = await response.json();
        
            setProduit(data); 
          
        } catch (error) {
          console.error('Erreur de requête:', error);
        } finally {
          setLoading(false);
        }
      };
      getProduit();
    }
  }, [id, open]);
  


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log('formJson', formJson);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Modifier l'Application {id}</DialogTitle>
        <DialogContent>
  {loading ? (
    <p>Chargement...</p>
  ) : produit ? (
    <>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label="Nom du Produit"
        defaultValue={produit.nom_produit}
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        id="description"
        name="description"
        label="Description"
        defaultValue={produit.description}
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        id="dosage"
        name="dosage"
        label="dosage"
        type="string"
        defaultValue={produit.dosage}
        fullWidth
        variant="standard"
      />
            <TextField
        margin="dense"
        id="prix"
        name="prix"
        label="Prix"
        type="number"
        defaultValue={produit.prix}
        fullWidth
        variant="standard"
      />
            <TextField
        margin="dense"
        id="laboratoire_fabriquant"
        name="laboratoire fabriquant"
        label="laboratoire fabriquant"
        type="string"
        defaultValue={produit.laboratoire_fabriquant}
        fullWidth
        variant="standard"
      />

{/* <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
    Age
  </InputLabel>
  <NativeSelect
    defaultValue={30}
    inputProps={{
      name: 'age',
      id: 'uncontrolled-native',
    }}
  >
    <option value={10}>Ten</option>
    <option value={20}>Twenty</option>
    <option value={30}>Thirty</option>
  </NativeSelect>
</FormControl> */}
      
      
    </>
  ) : (
    <p>Produit non trouvé</p>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Sauvegarder</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
