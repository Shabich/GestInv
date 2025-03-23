import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { apiFetch } from '../utils/api'

interface User {
  nom?: string
  prenom?: string
  adresse_mail?: string
  adresse?: string
  num_tel?: string
  date_naissance?: Date
  id_t_rappel?: number
  password?: string
  admin: boolean
}

interface FormDialogProps {
  id: number | null
  open: boolean
  handleClose: () => void
  reloadUsers: () => void
}

const FormDialog: React.FC<FormDialogProps> = ({ open, id, handleClose, reloadUsers }) => {
  const [user, setUser] = useState<User>({
    nom: '',
    prenom: '',
    admin: false,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [messageSucces, setMessageSucces] = useState<string | null>(null) // État pour le message de succès

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    if (open && id !== null) {
      const getUser = async () => {
        setLoading(true)
        setError(null)
        try {
          const data = await apiFetch<User>(`/users/${id}`)
          const userForm = { ...data }
          if (userForm.date_naissance)
            userForm.date_naissance = userForm.date_naissance.slice(0, 10)
          setUser(userForm)
        } catch (error: unknown) {
          console.error('Erreur de requête :', error)
          console.error(
            error instanceof Error ? error.message : 'Erreur lors de la récupération du user.',
          )
        } finally {
          setLoading(false)
        }
      }
      getUser()
    } else if (open) {
      setUser({
        nom: '',
        prenom: '',
        adresse_mail: '',
        adresse: '',
        num_tel: '',
        admin: false,
      })
      setError(null)
    }
  }, [id, open, token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    try {
      console.log(user, 'bodyput')
      const response :Response = await apiFetch(`/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Erreur backend lors de la sauvegarde du user :', errorData)
        throw new Error(errorData.message || 'Erreur lors de la requête')
      }
      setMessageSucces('User modifié avec succès')
      setTimeout(() => setMessageSucces(null), 3000)
      handleClose()
      reloadUsers()
    } catch (error: unknown) {
      console.error(
        error instanceof Error ? error.message : "Erreur lors de l'enregistrement du user.",
      )
    }
  }

  return (
    <>
        {messageSucces && (
        <div
          style={{ backgroundColor: 'green', color: 'white', padding: '10px',marginTop: '100px', textAlign: 'center' }}
        >
          {messageSucces}
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Modifier User</DialogTitle>
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
                  id="nom"
                  name="nom"
                  label="Nom"
                  value={user.nom}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="prenom"
                  name="prenom"
                  label="prenom"
                  value={user.prenom}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="adresse"
                  name="adresse"
                  label="adresse"
                  value={user.adresse}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="adresse_mail"
                  name="adresse_mail"
                  label="adresse mail"
                  value={user.adresse_mail}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="num_tel"
                  name="num_tel"
                  label="numéro de telephone"
                  value={user.num_tel}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="date_naissance"
                  name="date_naissance"
                  label="date naissance"
                  value={user.date_naissance}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />

                <TextField
                  margin="dense"
                  id="admin"
                  name="admin"
                  label="admin"
                  value={user.admin}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit">Sauvegarder</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default FormDialog
