
import { Outlet } from "react-router-dom";
// import Footer from "../component/Footer";
import Logo from '../assets/images/gsb-logo.png'


export default function MainLayout() {
  return (
    <>
            <header className='bg-white shadow-md p-1 px-5'>
            <div className='flex justify-between items-center'>
                <img src={Logo} alt="logo" width={100} height={50}/>
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
                </nav>
                <div className="flex  justify-between items-center min-w-28">
                    <a href="" className="color-black hover:text-blue-500">
                        {/* <a className="color-black hover:text-blue-500">Login</a> */}
                        Login
                    </a>
                    <a href="" className="p-2 bg-blue-500 rounded-md text-white">
                        {/* <a className="p-2 bg-blue-500 rounded-md text-white">Sign up</a> */}
                        Sign up
                    </a>
                </div>
            </div>
        </header>
        <main>
        <div>
          <Outlet/>
        </div>
        {/* <Footer/> */}
      </main>
    </>
  );
}

