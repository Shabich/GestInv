
import Logo from '../../../public/assets/images/gsb-logo.png';
import { Menu } from '@headlessui/react';
import { useLocation } from 'react-router-dom';

const user = {
  imageUrl: '',
};

const userNavigation = [
  { name: 'Mon Profil', href: '#' },
  { name: 'Mes Paramètres', href: '#' },
  { name: 'Se déconnecter', href: '#' },
];

const Header = () => {
  const location = useLocation(); // Récupère l'URL actuelle

  const isActive = (path: string) => location.pathname === path; // Vérifie si le chemin est actif

  return (
    <header className="bg-white shadow-md p-1 px-5">
      <div className="flex justify-between items-center">
        <img src={Logo} alt="logo" width={100} height={50} />
        <nav className="flex justify-between min-w-28">
          <a
            href="/"
            className={`hover:text-blue-500 ${
              isActive('/') ? 'text-blue-600 font-bold' : 'text-gray-700'
            }`}
          >
            Home
          </a>

          <a
            href="/page/NosProduits"
            className={`hover:text-blue-500 ${
              isActive('/page/NosProduits') ? 'text-blue-600 font-bold' : 'text-gray-700'
            }`}
          >
            Nos produits
          </a>

          <a
            href="/page/NousConnaitre"
            className={`hover:text-blue-500 ${
              isActive('/page/NousConnaitre') ? 'text-blue-600 font-bold' : 'text-gray-700'
            }`}
          >
            Nous connaitre
          </a>

          <a
            href="/page/EspacePresse"
            className={`hover:text-blue-500 ${
              isActive('/page/EspacePresse') ? 'text-blue-600 font-bold' : 'text-gray-700'
            }`}
          >
            Espace presse
          </a>
        </nav>
        <div className="flex justify-between items-center min-w-28">
          {/* User Menu */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Menu.Button className="flex items-center bg-gray-800 rounded-full focus:outline-none">
                <img
                  src={user.imageUrl}
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    <a
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </a>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;