import { Outlet, useNavigate } from "react-router-dom";
import Logo from '../assets/images/gsb-logo.png'

export default function MainLayout() {
  const navigate = useNavigate(); 

  const handleLogout = () => {

    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <header className='bg-white shadow-md p-1 px-5'>
        <div className='flex justify-between items-center'>
          <img src={Logo} alt="logo" width={100} height={50} />
          <nav className='flex justify-between gap-9 min-w-28'>
            <a href="/" className="duration-5 hover:bg-silver px-[10px]">
              Home
            </a>
            <a href="/NosProduits" className="hover:bg-silver px-[10px]">
              Nos produits
            </a>
            <a href="/NousConnaitre" className="hover:bg-silver px-[10px]">
              Nous connaitre
            </a>
            <a href="/EspacePresse" className="hover:bg-silver px-[10px]">
              Espace presse
            </a>
            <a href="/AdminPanel" className="hover:bg-silver px-[10px]">
              Panneau d'administration
            </a>
            <a href="/Panier" className="hover:bg-silver px-[10px]">
            Panier
            </a>
          </nav>
          <div className="flex justify-between items-center min-w-28">
            <button onClick={handleLogout} className="text-black hover:text-blue-500">
              Log out
            </button>
          </div>
        </div>
      </header>
      <main>
        <div>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </main>
    </>
  );
}
