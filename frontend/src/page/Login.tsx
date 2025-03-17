import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [adresse, setAdresse] = useState('')
  const [num_tel, setNum_tel] = useState('')
  const [date_naissance, setDate_naissance] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // Ajout pour afficher des erreurs
  // Récupérer le token
  const token = localStorage.getItem('authToken')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])
  if (isAuthenticated) {
    navigate('/')
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const endpoint = isSignUp ? 'signup' : 'signin'
    setErrorMessage('') // Réinitialiser les erreurs

    try {
      console.log('Données envoyées :', { email, password })

      const dataForm = isSignUp
        ? { email, password, nom, prenom, adresse, num_tel, date_naissance }
        : { email, password }

      const response = await fetch(`http://localhost:3000/api/auth/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify(dataForm),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Erreur backend :', data)
        throw new Error(data.message || 'Une erreur est survenue')
      }

      if (isSignUp) {
        // Connexion après inscription
        const loginResponse = await fetch(`http://localhost:3000/api/auth/signin`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify({ nom, email, password }),
        })

        const loginData = await loginResponse.json()

        if (!loginResponse.ok || !loginData.token) {
          console.error('Erreur backend :', loginData)
          throw new Error("Erreur lors de la connexion après l'inscription")
        }

        localStorage.setItem('authToken', loginData.token)
        setIsAuthenticated(true)
        navigate('/')
      } else {
        if (data.token) {
          localStorage.setItem('authToken', data.token)
          setIsAuthenticated(true)
          navigate('/')
        } else {
          console.error('Token absent dans la réponse')
          throw new Error('Token absent dans la réponse')
        }
      }
    } catch (error: unknown) {
      console.error(
        error instanceof Error ? error.message : 'Une erreur inattendue lors de la connexion.',
      )
    }
  }

  return (
    <div>
      <div className="flex justify-center p-20">
        <div className="flex flex-col justify-center items-center p-5 bg-white shadow-xl p-9 rounded-md gap-4">
          <div className="flex flex-col">
            <p>{isSignUp ? 'Se créer un compte' : 'Se connecter à son compte'}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {isSignUp && (
              <>
                <div className="flex gap-3 max-w-96">
                  <input
                    className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                    type=""
                    placeholder="Nom"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                    type=""
                    placeholder="Prénom"
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                  />
                </div>
                <input
                  className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                  type=""
                  placeholder="Adresse"
                  value={adresse}
                  onChange={e => setAdresse(e.target.value)}
                />
                <input
                  className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                  type=""
                  placeholder="Téléphone"
                  value={num_tel}
                  onChange={e => setNum_tel(e.target.value)}
                />
                <input
                  className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                  type=""
                  placeholder="date naissance"
                  value={date_naissance}
                  onChange={e => setDate_naissance(e.target.value)}
                />
              </>
            )}

            <div className="flex flex-col gap-3 justify-center items-center">
              <input
                className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                type="email"
                placeholder="mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

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
