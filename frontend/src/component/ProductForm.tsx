import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import { Categorie } from '../types'
import { apiFetch } from '../utils/api'

interface Produit {
  nom_produit: string
  description: string
  dosage: string
  prix: number
  laboratoire_fabriquant: string
  forme: string // Ajout du champ `forme`
  id_t_categorie: number
  image_url: string
}

interface FormDialogProps {
  id: number | null
  open: boolean
  handleClose: () => void
  reloadProduits: () => void
}

const formesOptions = [
  { label: 'Orale', value: 'orale' },
  { label: 'Injectable', value: 'injectable' },
  { label: 'Dermique', value: 'dermique' },
  { label: 'Médicamenteuse', value: 'médicamenteuse' },
]

const FormDialog: React.FC<FormDialogProps> = ({ open, id, handleClose, reloadProduits }) => {
  const [produit, setProduit] = useState<Produit>({
    nom_produit: '',
    description: '',
    dosage: '',
    prix: 0,
    laboratoire_fabriquant: '',
    forme: '', // Initialisation du champ `forme`
    id_t_categorie: 0,
    image_url: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [messageSucces, setMessageSucces] = useState<string | null>(null) // État pour le message de succès
  const [categorie, setCategorie] = useState<Categorie[]>([])

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    getCategories()
    if (id !== null && open) {
      
      const getProduit = async () => {
        setLoading(true)
        setError(null)
        try {
          const data = await apiFetch<Produit[]>(`produits/${id}`)
          setProduit(data[0])
        } catch (error: unknown) {
          console.error('Erreur de requête :', error)
          console.error(
            error instanceof Error ? error.message : 'Erreur lors de la récupération du produit.',
          )
        } finally {
          setLoading(false)
        }
      }

      getProduit()
    } else if (open) {
      setProduit({
        nom_produit: '',
        description: '',
        dosage: '',
        prix: 0,
        laboratoire_fabriquant: '',
        forme: '', // Réinitialisation du champ `forme`
        id_t_categorie: 0,
        image_url: '',
      })
      setError(null)
    }
  }, [id, open, token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduit(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setProduit(prev => ({
      ...prev,
      forme: e.target.value as string, // Gestion du champ `forme`
    }))
  }
  const handleSelectCateChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    console.log(categorie)

    setProduit(prev => ({
      ...prev,
      id_t_categorie: e.target.value as number, // Gestion du champ `forme`
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    try {
      const method = id ? 'PUT' : 'POST'
      const url = id
        ? `/produits/${id}`
        : `/produits`

      const response: Response = await apiFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produit),
      })

      if (!response) {
        console.error('Erreur backend lors de la sauvegarde du produit :')
        throw new Error('Erreur lors de la requête')
      }
      setMessageSucces(id ? 'Produit modifié avec succès' : 'Produit créé avec succès')
      setTimeout(() => setMessageSucces(null), 3000)
      handleClose()
      reloadProduits()
    } catch (error: unknown) {
      console.error(
        error instanceof Error ? error.message : "Erreur lors de l'enregistrement du produit.",
      )
    }
  }

  const getCategories = async () => {
    try {
      const data = await apiFetch<Categorie[]>('/produits/categorie')
      setCategorie(data)
    } catch (error) {
      console.error('Erreur de requête:', error)
    }
  }
  return (
    <>
      {messageSucces && (
        <div
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            marginTop: '100px',
            textAlign: 'center',
          }}
        >
          {messageSucces}
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{id ? 'Modifier Produit' : 'Créer Produit'}</DialogTitle>
          <DialogContent>
            {loading ? (
              <p>Chargement...</p>
            ) : (
              <>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="nom_produit"
                  name="nom_produit"
                  label="Nom du Produit"
                  value={produit.nom_produit}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  value={produit.description}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="dosage"
                  name="dosage"
                  label="Dosage"
                  value={produit.dosage}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="prix"
                  name="prix"
                  label="Prix"
                  type="number"
                  value={produit.prix}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="laboratoire_fabriquant"
                  name="laboratoire_fabriquant"
                  label="Laboratoire Fabriquant"
                  value={produit.laboratoire_fabriquant}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="image_url"
                  name="image_url"
                  label="Image"
                  value={produit.image_url}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />

                <TextField
                  select
                  required
                  margin="dense"
                  id="forme"
                  name="forme"
                  label="Forme"
                  value={produit.forme}
                  onChange={handleSelectChange} // Utilise bien la fonction de mise à jour
                  fullWidth
                  variant="standard"
                >
                  {formesOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  required
                  margin="dense"
                  id="id_t_categorie"
                  name="id_t_categorie"
                  label="Catégorie"
                  value={produit.id_t_categorie}
                  onChange={handleSelectCateChange}
                  fullWidth
                  variant="standard"
                >
                  {Array.isArray(categorie)
                    ? categorie.map(option => (
                        <MenuItem key={option.id_t_categorie} value={option.id_t_categorie}>
                          {option.lib_court}
                        </MenuItem>
                      ))
                    : []}
                </TextField>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit">{id ? 'Sauvegarder' : 'Créer'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default FormDialog
