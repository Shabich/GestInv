import { useEffect, useState } from 'react'
import { Card, CardContent, Box, Typography, TextField, Button, Divider } from '@mui/material'
import { AccountCircle, Margin } from '@mui/icons-material'

interface ProfileData {
  nom: string
  prenom: string
  adresse_mail: string
  adresse: string
  num_tel: string
  date_naissance: string
  new_password?: string
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    num_tel: '',
    date_naissance: '',
  })
  const [oldEmail, setOldEmail] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const userId = localStorage.getItem('id_t_user')
        // if (!userId) return
        // const response = await apiFetch(`http://localhost:3000/api/users/${userId}`)
        // setOldEmail(response.data.adresse_mail)
        // setProfile(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur', error)
      }
    }
    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('id_t_user')
      if (!userId) return

      const body = { ...profile, ancienne_adresse_mail: oldEmail }
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        alert('Profil mis à jour avec succès!')
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error)
      alert("Une erreur s'est produite, veuillez réessayer.")
    }
  }

  return (
    <Box className="max-w-screen-xl mx-auto p-6">
      <Card sx={{ display: 'flex', flexDirection: 'row', padding: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <AccountCircle sx={{ fontSize: 100, color: 'gray' }} />
          </Box>
          <Typography variant="h5" align="center" className="font-semibold" sx={{marginBottom: '30px'}}>
            Profil utilisateur
          </Typography>

          {/* User Information */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <div>
              <Typography variant="body1" className="font-medium text-gray-700">
                Nom complet
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {profile.prenom} {profile.nom}
              </Typography>
            </div>

            <div>
              <Typography variant="body1" className="font-medium text-gray-700">
                Email
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {profile.adresse_mail}
              </Typography>
            </div>

            <div>
              <Typography variant="body1" className="font-medium text-gray-700">
                Téléphone
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {profile.num_tel}
              </Typography>
            </div>

            <div>
              <Typography variant="body1" className="font-medium text-gray-700">
                Adresse
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {profile.adresse}
              </Typography>
            </div>

            <div>
              <Typography variant="body1" className="font-medium text-gray-700">
                Date de naissance
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {profile.date_naissance}
              </Typography>
            </div>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ marginY: 3 }} />

      {/* Form to Edit Profile */}
      {isEditing ? (
        <Card sx={{ padding: 3 }}>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Modifier le Profil
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { label: 'Nom', name: 'nom' },
                { label: 'Prénom', name: 'prenom' },
                { label: 'Adresse', name: 'adresse' },
                { label: 'Téléphone', name: 'num_tel' },
              ].map(({ label, name }) => (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  type={'text'}
                  value={profile[name as keyof ProfileData]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  className="mb-4"
                />
              ))}

              <TextField
                label="Nouveau mot de passe"
                name="new_password"
                type="password"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mb-4"
              />

              {/* Rajouter ici un texfied pour la date label: "Date de naissance", name: "date_naissance", type: "date" */}

              <TextField
                label="Date de naissance"
                name="date_naissance"
                type="date"
                value={profile.date_naissance}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{
                  shrink: true, // ensures the label stays above the input
                }}
              />

              <TextField
                label="Confirmer le mot de passe"
                name="confirm_password"
                type="password"
                fullWidth
                variant="outlined"
                className="mb-4"
              />

              <Button onClick={handleSubmit} variant="contained" fullWidth color="primary">
                Sauvegarder les modifications
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsEditing(true)} variant="outlined" fullWidth color="primary">
          Modifier mon profil
        </Button>
      )}
    </Box>
  )
}

export default ProfilePage
