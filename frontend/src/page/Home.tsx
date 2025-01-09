function Home() {
  return (
    <div>
      {/* Section principale */}
      <div
  className="relative text-center bg-home bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col justify-center items-center p-20 md:p-60"
  style={{
    borderTopRightRadius: '90px',
    borderBottomRightRadius: '10px',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '90px',
  }}
>
  {/* Superposition sombre */}
  <div className="absolute inset-0 bg-black opacity-50 rounded-[90px_10px_10px_90px]" />

  {/* Contenu */}
  <div className="relative z-10">
    <h4 className="font-Oswald text-white text-5xl md:text-7xl lg:text-9xl mb-10 md:mb-20">
      GESTINV GSB
    </h4>
    <input
      type="text"
      className="px-4 py-2 w-full md:w-1/2 lg:w-1/3"
      placeholder="Rechercher"
    />
  </div>
</div>


      {/* Section "Qui sommes-nous ?" */}
      <div className="flex flex-col gap-10 mt-10 md:mt-20 px-6 md:px-20 lg:px-36 py-10 md:py-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl">Qui sommes-nous ?</h2>
        <div className="text-lg md:text-xl lg:text-2xl">
          <p>
            Créés en 2015, Les Laboratoires Ethypharm, filiale commerciale française du Groupe,
            mettent sur le marché les spécialités pharmaceutiques développées ou acquises par
            Ethypharm.
          </p>
          <br />
          <p>
            Ils mettent à la disposition des professionnels de santé et de leurs patients, en
            France, des médicaments dans les domaines du SNC (douleur, addiction), des Injectables
            Hospitaliers (soins d’urgences et intensifs), la rhumatologie et la cardiologie.
          </p>
          <br />
          <p>
            Avec son portefeuille diversifié et composé de médicaments de marque distribués tant en
            ville qu’à l’hôpital – dont certains occupent des positions de leader dans leurs classes
            thérapeutiques respectives – Les Laboratoires Ethypharm disposent d’une belle
            reconnaissance de la part des professionnels de santé.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;