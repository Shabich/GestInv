import { MenuItem, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numTel, setNumTel] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPharmacy, setIsPharmacy] = useState(false); // Nouvel état pour "Je suis une pharmacie"
  const [id_t_pharmacie, setId_t_pharmacie] = useState(''); // State for pharmacy ID

  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/pharmacie')
      .then(res => res.json())
      .then(data =>
        setPharmacies(
          data.map((pharmacie: any) => ({
            value: pharmacie.id_t_pharmacie,
            label: `${pharmacie.lib_court} (${pharmacie.departement})`,
          })),
        ),
      )
      .catch(error => console.error('Erreur récupération pharmacies:', error));
  }, []);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  if (isAuthenticated) {
    navigate('/');
  }

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setId_t_pharmacie(e.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const endpoint = isSignUp ? 'signup' : 'signin';
    setErrorMessage('');

    try {
      console.log('Données envoyées :', { email, password });

      const dataForm = isSignUp
        ? {
            email,
            password,
            nom,
            prenom,
            adresse,
            num_tel: numTel,
            date_naissance: dateNaissance,
            ...(id_t_pharmacie && { id_t_pharmacie }), // Conditionally include id_t_pharmacie if not empty
          }
        : { email, password };

      const response = await fetch(`http://localhost:3000/api/auth/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erreur backend :', data);
        throw new Error(data.message || 'Une erreur est survenue');
      }

      if (isSignUp) {
        // Connexion après inscription
        const loginResponse = await fetch(`http://localhost:3000/api/auth/signin`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok || !loginData.token) {
          console.error('Erreur backend :', loginData);
          throw new Error("Erreur lors de la connexion après l'inscription");
        }

        localStorage.setItem('authToken', loginData.token);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          setIsAuthenticated(true);
          navigate('/');
        } else {
          console.error('Token absent dans la réponse');
          throw new Error('Token absent dans la réponse');
        }
      }
    } catch (error: unknown) {
      console.error(
        error instanceof Error ? error.message : 'Une erreur inattendue lors de la connexion.',
      );
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  return (
    <div>
      <div className="flex justify-center p-20">
        <div className="flex flex-col justify-center items-center p-5 bg-white shadow-xl rounded-md gap-4">
          <div className="flex flex-col">
            <p>{isSignUp ? 'Se créer un compte' : 'Se connecter à son compte'}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <input
                    className="border border-gray-300 focus:border-black w-full p-2 rounded-md focus:outline-none"
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 focus:border-black w-full p-2 rounded-md focus:outline-none"
                    type="text"
                    placeholder="Prénom"
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 focus:border-black w-full p-2 rounded-md focus:outline-none"
                    type="text"
                    placeholder="Adresse"
                    value={adresse}
                    onChange={e => setAdresse(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 focus:border-black w-full p-2 rounded-md focus:outline-none"
                    type="tel"
                    placeholder="Numéro de téléphone"
                    value={numTel}
                    onChange={e => setNumTel(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 focus:border-black w-full p-2 rounded-md focus:outline-none"
                    type="date"
                    placeholder="Date de naissance"
                    value={dateNaissance}
                    onChange={e => setDateNaissance(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    className="border border-gray-300 focus:border-black w-full p-2 rounded-md focus:outline-none"
                    type="email"
                    placeholder="Adresse mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 focus:border-black w-full p-2 rounded-md focus:outline-none"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {/* Checkbox pour "Je suis une pharmacie" */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isPharmacy}
                        onChange={e => setIsPharmacy(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Je suis une pharmacie"
                  />
                  {/* Afficher le champ de sélection de la pharmacie uniquement si l'utilisateur est une pharmacie */}
                  {isPharmacy && (
                    <>
                      <TextField
                        select
                        required
                        margin="dense"
                        label="Pharmacie"
                        fullWidth
                        variant="standard"
                        onChange={handleSelectChange} 
                      >
                        {pharmacies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {/* Bouton "Je ne trouve pas ma pharmacie" */}
                      <button
                        type="button"
                        className="text-blue-500 text-sm"
                        onClick={() => console.log('formulaire de création de pharmacie')}
                      >
                        Je ne trouve pas ma pharmacie
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {!isSignUp && (
              <div className="flex flex-col gap-3 justify-center items-center">
                <input
                  className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                  type="email"
                  placeholder="Adresse mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            )}

            <button className="px-10 bg-blue py-4 text-white rounded-xl" type="submit">
              {isSignUp ? 'Créer le compte' : 'Se connecter'}
            </button>
          </form>
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 mt-4">
            {isSignUp ? 'Déjà un compte ? Connectez-vous' : 'Pas de compte ? Créez-en un'}
          </button>
          <button onClick={() => navigate('/')} className="text-blue-500 mt-4">
            Revenir sur le site
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth