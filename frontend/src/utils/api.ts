const BASE_URL = "http://localhost:3000/api";

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("authToken");
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    ...options.headers,
  });

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // Gestion des erreurs HTTP
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      return Promise.reject(new Error("Token expiré, redirection vers login..."));
    }

    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage || "Une erreur est survenue"));
  }

  try {
    return (await response.json()) as T;
  } catch {
    return Promise.reject(new Error("Réponse non valide (pas du JSON)"));
  }
}
