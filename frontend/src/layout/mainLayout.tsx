import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Logo from '../assets/images/gsb-logo.png';

export default function MainLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-1 px-5">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="logo" className="w-24 h-12" />
          <nav className="hidden lg:flex justify-between gap-9 min-w-28">
            <a href="/" className="duration-500 hover:bg-silver px-[10px]">Home</a>
            <a href="/NosProduits" className="duration-500 hover:bg-silver px-[10px]">Nos produits</a>
            <a href="/NousConnaitre" className="duration-500 hover:bg-silver px-[10px]">Nous connaitre</a>
            <a href="/EspacePresse" className="duration-500 hover:bg-silver px-[10px]">Espace presse</a>
            <a href="/AdminPanel" className="duration-500 hover:bg-silver px-[10px]">Panneau d'administration</a>
            <a href="/Panier" className="duration-500 hover:bg-silver px-[10px]">Panier</a>
            <div className="flex justify-between items-center min-w-28">
            <button onClick={handleLogout} className="text-black hover:text-blue-500">Log out</button>
          </div>
          </nav>
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>




      {/*Menu responsive - visible en dessous de 1024px (lg) */}
      <div
        className={`fixed top-20 right-0 z-50 w-4/6 sm:w-2/6 lg:hidden h-5/6 bg-white text-white shadow-black transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} rounded-tl-xl rounded-bl-xl shadow-2xl`}
        style={{
          borderTopLeftRadius: '80px',
          borderBottomLeftRadius: '80px',
        }}
      >
        <div className="h-full flex flex-col justify-center items-center p-4">
          <img src={Logo} alt="logo" className="w-24 h-12 mb-6 rounded-xl" />
          <nav className="space-y-4 w-full text-center">
            <a href="/" className="block px-4 py-2 hover:bg-gray-800 text-black rounded-lg transition duration-300">Home</a>
            <a href="/NosProduits" className="block px-4 py-2 hover:bg-gray-800 text-black rounded-lg transition duration-300">Nos produits</a>
            <a href="/NousConnaitre" className="block px-4 py-2 hover:bg-gray-800 text-black rounded-lg transition duration-300">Nous connaitre</a>
            <a href="/EspacePresse" className="block px-4 py-2 hover:bg-gray-800 text-black rounded-lg transition duration-300">Espace presse</a>
            <a href="/AdminPanel" className="block px-4 py-2 hover:bg-gray-800 text-black rounded-lg transition duration-300">Panneau d'administration</a>
            <a href="/Panier" className="block px-4 py-2 hover:bg-gray-800 text-black rounded-lg transition duration-300">Panier</a>
            {/* Bouton de déconnexion dans le menu responsive */}
            <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-800 text-black rounded-lg transition duration-300 w-full text-center">
              Log out
            </button>
          </nav>
        </div>
      </div>
      <main className={`p-5 ${isMenuOpen ? 'blur-sm' : ''}`}>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}