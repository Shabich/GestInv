export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("token"); // Récupère le token
  
    // Ajoute le token à l'en-tête Authorization
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    const response = await fetch(url, options);
  
    // Si le token est expiré (401 Unauthorized), on redirige vers /login
    if (response.status === 401 || 403) {
      localStorage.removeItem("token"); // Supprime le token expiré
      window.location.href = "/login"; // Redirige vers la page de connexion
      return Promise.reject(new Error("Token expiré, redirection vers login..."));
    }
  
    return response.json() as Promise<T>;
  }
  