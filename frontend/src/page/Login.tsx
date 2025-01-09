import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Ajout pour afficher des erreurs
  // Récupérer le token
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const endpoint = isSignUp ? "signup" : "signin";
    setErrorMessage(""); // Réinitialiser les erreurs

    try {
      console.log("Données envoyées :", { email, password });

      const response = await fetch(`http://localhost:3000/api/auth/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
           
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erreur backend :", data);
        throw new Error(data.message || "Une erreur est survenue");
      }

      if (isSignUp) {
        // Connexion après inscription
        const loginResponse = await fetch(`http://localhost:3000/api/auth/signin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok || !loginData.token) {
          console.error("Erreur backend :", loginData);
          throw new Error("Erreur lors de la connexion après l'inscription");
        }

        localStorage.setItem("authToken", loginData.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setIsAuthenticated(true);
          navigate("/");
        } else {
          console.error("Token absent dans la réponse");
          throw new Error("Token absent dans la réponse");
        }
      }
    } catch (error: any) {
      console.error("Erreur :", error);
      setErrorMessage(error.message || "Une erreur est survenue");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bienvenue ! Vous êtes connecté.</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-black py-2 px-4 rounded"
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div className="flex justify-center p-20">
          <div className="flex flex-col justify-center items-center p-5 bg-white shadow-xl w-96 rounded-md gap-4">
            <div className="flex flex-col mr-52">
              <h2 className="text-lg font-bold">
                {isSignUp ? "Sign up" : "Log in"}
              </h2>
              <p>
                {isSignUp ? "Se créer un compte" : "Se connecter à son compte"}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errorMessage && (
                <p style={{ color: "red" }}>{errorMessage}</p>
              )}
              <input
                className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                type="email"
                placeholder="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border border-gray-300 focus:border-black w-60 p-2 rounded-md focus:outline-none"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="px-10 bg-blue py-4 text-white rounded-xl"
                type="submit"
              >
                {isSignUp ? "Créer le compte" : "Se connecter"}
              </button>
            </form>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 mt-4"
            >
              {isSignUp
                ? "Déjà un compte ? Connectez-vous"
                : "Pas de compte ? Créez-en un"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
