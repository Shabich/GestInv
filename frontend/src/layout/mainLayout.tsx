
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
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
        <Footer/>
      </main>
    </>
  );
}


    // <div className="min-h-full bg-gray-100">
    //   <Disclosure as="nav" className="flex justify-around bg-gray-800">
    //     {({ open }) => (
    //       <>
    //         <div className="bg-white shadow-md p-1 px-5">
    //           <div className="flex justify-between items-center">
    //             {/* Logo & Navigation */}
    //             <div className="flex items-center">
    //               <img
    //                 src=""
    //                 alt="Logo"
    //                 className="h-8 w-8"
    //               />
    //               <div className="hidden md:flex space-x-4 ml-4">
    //                 {navigation.map((item) => (
    //                   <a
    //                     key={item.name}
    //                     href={item.href}
    //                     className={classNames(
    //                       item.current
    //                         ? 'bg-gray-900 text-white'
    //                         : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    //                       'rounded-md px-3 py-2 text-sm font-medium'
    //                     )}
    //                   >
    //                     {item.name}
    //                   </a>
    //                 ))}
    //               </div>
    //             </div>

    //             {/* User Menu */}
    //             <div className="hidden md:flex items-center">
    //               <Menu as="div" className="relative">
    //                 <Menu.Button className="flex items-center bg-gray-800 rounded-full focus:outline-none">
    //                   <img
    //                     src={user.imageUrl}
    //                     alt="User"
    //                     className="h-8 w-8 rounded-full"
    //                   />
    //                 </Menu.Button>
    //                 <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                   {userNavigation.map((item) => (
    //                     <Menu.Item key={item.name}>
    //                       <a
    //                         href={item.href}
    //                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //                       >
    //                         {item.name}
    //                       </a>
    //                     </Menu.Item>
    //                   ))}
    //                 </Menu.Items>
    //               </Menu>
    //             </div>

    //             {/* Mobile Menu Button */}
    //             <Disclosure.Button className="md:hidden bg-gray-800 text-gray-400 p-2 rounded-md focus:outline-none">
    //               <span className="sr-only">Open menu</span>
    //               {open ? 'Close' : 'Open'}
    //             </Disclosure.Button>
    //           </div>
    //         </div>

    //         {/* Mobile Navigation */}
    //         <Disclosure.Panel className="md:hidden bg-gray-700">
    //           <div className="space-y-1 px-2 py-3">
    //             {navigation.map((item) => (
    //               <a
    //                 key={item.name}
    //                 href={item.href}
    //                 className={classNames(
    //                   item.current
    //                     ? 'bg-gray-900 text-white'
    //                     : 'text-gray-300 hover:bg-gray-600 hover:text-white',
    //                   'block px-3 py-2 rounded-md text-base font-medium'
    //                 )}
    //               >
    //                 {item.name}
    //               </a>
    //             ))}
    //           </div>
    //           <div className="border-t border-gray-600 px-4 py-3">
    //             <div className="flex items-center">
    //               <img
    //                 src={user.imageUrl}
    //                 alt="User"
    //                 className="h-8 w-8 rounded-full"
    //               />
    //             </div>
    //             <div className="mt-3 space-y-1">
    //               {userNavigation.map((item) => (
    //                 <a
    //                   key={item.name}
    //                   href={item.href}
    //                   className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white rounded-md"
    //                 >
    //                   {item.name}
    //                 </a>
    //               ))}
    //             </div>
    //           </div>
    //         </Disclosure.Panel>
    //       </>
    //     )}
    //   </Disclosure>

    //   <main>
    //     <div className="mx-auto max-w-7xl px-4 py-6">
    //       <Outlet/>
    //     </div>
    //   </main>
    // </div>