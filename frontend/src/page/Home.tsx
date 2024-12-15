function Home() {
  return (
    <div>
      <div className="text-center bg-home bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col justify-center items-center p-60">
        <h1 className="font-Oswald text-white text-9xl mb-20">GSB Laboratory</h1>
        <input type="text" className="px-4 py-2 w-1/2" placeholder="Rechercher" />
      </div>

      <div className="xl:flex flex-col gap-10 mt-20 px-36 py-20 max-w-6xl">
        <h2 className="text-6xl">Qui sommes nous ?</h2>
        <div className="text-2xl">
          <p>
            Créés en 2015, Les Laboratoires Ethypharm, filiale commerciale française du Groupe,
            mettent sur le marché les spécialités pharmaceutiques développées ou acquises par
            Ethypharm.
          </p>
          <p>
            Ils mettent à la disposition des professionnels de santé et de leurs patients, en
            France, des médicaments dans les domaines du SNC (douleur, addiction), des Injectables
            Hospitaliers (soins d’urgences et intensifs), la rhumatologie et la cardiologie.
          </p>
          <p>
            Avec son portefeuille diversifié et composé de médicaments de marque distribués tant en
            ville qu’à l’hôpital – dont certains occupent des positions de leader dans leurs classes
            thérapeutiques respectives – Les Laboratoires Ethypharm disposent d’une belle
            reconnaissance de la part des professionnels de santé.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
