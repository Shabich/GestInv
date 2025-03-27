import { useEffect, useState } from 'react';
import { Card, CardContent, Box, Typography, TextField, Button, Divider } from '@mui/material';
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
    date_naissance: new Date(), // Initialisation à une date par défaut
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldEmail, setOldEmail] = useState('');

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

        // Conversion de la date au format Date si elle existe
        const formattedData = {
          ...data,
          date_naissance: data.date_naissance ? new Date(data.date_naissance) : new Date(),
        };

        setProfile(formattedData);
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
      // Convertir la chaîne de date en objet Date
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

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Token non trouvé");

      const updatedProfile = {
        ...profile,
        date_naissance: profile.date_naissance.toISOString(), // Convertir Date en ISO string
      };

      const response = await fetch(`http://localhost:3000/api/users/update`, {
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
                value={profile.date_naissance.toISOString().split('T')[0]} // Format YYYY-MM-DD
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
                name="confirm_password"
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
    </Box>
  );
};

export default ProfilePage;
