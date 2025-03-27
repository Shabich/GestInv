import { useEffect, useState } from 'react';
import { Card, CardContent, Box, Typography, TextField, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

interface ProfileData {
  nom: string;
  prenom: string;
  adresse_mail: string;
  adresse: string;
  num_tel: string;
  date_naissance: Date;
  new_password?: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    num_tel: '',
    date_naissance: new Date(),
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error("Token non trouvé");

        const decoded: any = jwtDecode(token);
        const userId = decoded.id;

        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Erreur lors de la récupération des données utilisateur');

        const data = await response.json();
        setOldEmail(data.adresse_mail);

        setProfile({
          ...data,
          date_naissance: data.date_naissance ? new Date(data.date_naissance) : new Date(),
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur', error);
        alert('Impossible de charger les données utilisateur.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'date_naissance') {
      setProfile({ ...profile, date_naissance: new Date(value) });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (profile.new_password && profile.new_password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    setOpenDialog(true);
  };

  const confirmUpdate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Token non trouvé");

      const decoded: any = jwtDecode(token);
      const userId = decoded.id;

      const updatedProfile = {
        ...profile,
        ancienne_adresse_mail: oldEmail,
        current_password: currentPassword,
      };

      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du profil');

      alert('Profil mis à jour avec succès !');
      setIsEditing(false);
      setOpenDialog(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
      alert("Une erreur s'est produite, veuillez réessayer.");
    }
  };

  return (
    <Box className="max-w-screen-xl mx-auto p-6">
      <Card sx={{ display: 'flex', flexDirection: 'row', padding: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <AccountCircle sx={{ fontSize: 100, color: 'gray' }} />
          </Box>
          <Typography variant="h5" align="center" sx={{ marginBottom: '30px' }}>
            Profil utilisateur
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {Object.entries(profile).map(([key, value]) => (
              key !== 'new_password' && (
                <div key={key}>
                  <Typography variant="body1" className="font-medium text-gray-700">
                    {key.replace('_', ' ').toUpperCase()}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {key === 'date_naissance' ? new Date(value).toLocaleDateString() : value}
                  </Typography>
                </div>
              )
            ))}
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ marginY: 3 }} />

      {isEditing ? (
        <Card sx={{ padding: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: '15px' }}>Modifier le Profil</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {['nom', 'prenom', 'adresse', 'num_tel'].map((field) => (
                <TextField
                  key={field}
                  label={field.replace('_', ' ').toUpperCase()}
                  name={field}
                  type="text"
                  value={profile[field as keyof ProfileData]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              ))}
              <TextField
                label="Date de naissance"
                name="date_naissance"
                type="date"
                value={profile.date_naissance.toISOString().split('T')[0]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Nouveau mot de passe"
                name="new_password"
                type="password"
                value={profile.new_password || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Confirmer le mot de passe"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                variant="outlined"
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmer votre identité</DialogTitle>
        <DialogContent>
          <TextField
            label="Mot de passe actuel"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={confirmUpdate} color="primary">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
