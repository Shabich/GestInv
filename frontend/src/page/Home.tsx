function Home() {

  return (
        <div>
            <div className="text-center bg-home bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col justify-center items-center p-60">
                <h1 className='font-Oswald text-white text-9xl mb-20'>GSB Laboratory</h1>
                <input type="text" className='px-4 py-2 w-1/2' placeholder='Rechercher'/>
            </div>

            <div className='xl:flex flex-col gap-10 mt-20 px-36 max-w-6xl'>
                <h2 className='text-6xl'>Qui sommes nous ?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum fuga dicta at repellat tempore rem sed, ex ipsam porro facere, in veritatis doloribus dignissimos a neque iusto expedita velit! Quas.</p>
            </div>
        </div>
  );
}

export default Home;