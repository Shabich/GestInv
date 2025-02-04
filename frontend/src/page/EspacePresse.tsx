import React, { FC } from 'react';

type ColorData = {
  color: string;
  name: string;
};

type TypographyData = {
  text: string;
  className: string;
};

type IconData = {
  src: string;
  alt: string;
};

type CharteData = {
  title: string;
  content: (ColorData | TypographyData | IconData)[];
  buttonText?: string;
};

type LogoData = {
  title: string;
  imageSrc: string;
  alt: string;
};

const EspacePresse: FC = () => {
  const logoData: LogoData[] = [
    { title: 'Logo Principal', imageSrc: '', alt: 'Logo Principal' },
    { title: 'Logo Secondaire', imageSrc: '', alt: 'Logo Secondaire' },
    { title: 'Logo Monochrome', imageSrc: 'https://via.placeholder.com/300x150', alt: 'Logo Monochrome' },
  ];

  const charteData: CharteData[] = [
    {
      title: 'Couleurs',
      content: [
        { color: 'bg-blue-500', name: 'Bleu Principal (#3B82F6)' },
        { color: 'bg-gray-800', name: 'Noir (#1F2937)' },
        { color: 'bg-gray-200', name: 'Gris Clair (#E5E7EB)' },
      ],
      buttonText: 'Télécharger la Palette',
    },
    {
      title: 'Typographies',
      content: [
        { text: 'Titre (Roboto Bold)', className: 'text-lg font-bold text-gray-800' },
        { text: 'Texte (Roboto Regular)', className: 'text-base text-gray-700' },
        { text: 'Sous-texte (Roboto Light)', className: 'text-sm text-gray-600' },
      ],
      buttonText: 'Télécharger les Polices',
    },
    {
      title: 'Icônes',
      content: [
        { src: 'https://via.placeholder.com/50', alt: 'icône 1' },
        { src: 'https://via.placeholder.com/50', alt: 'icône 2' },
        { src: 'https://via.placeholder.com/50', alt: 'icône 3' }
      ],
      buttonText: 'Télécharger les icônes'
    },
  ];

  const renderCard = (title: string, children: React.ReactNode, buttonText?: string) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-medium text-gray-700 mb-4">{title}</h3>
      {children}
      {buttonText && (
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300">
          {buttonText}
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Espace Presse</h1>
        <p className="text-lg text-gray-600 mt-2">Retrouvez ici tous les éléments nécessaires pour vos publications.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Logo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logoData.map((logo) => renderCard(logo.title, (
            <>
              <img src={logo.imageSrc} alt={logo.alt} className="w-full h-auto mb-4" />
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Télécharger
              </button>
            </>
          )))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Charte Graphique</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charteData.map((charte) => renderCard(
            charte.title,
            charte.title === 'Couleurs' ? (
              <div className="space-y-2">
                {charte.content.map((item, idx) =>
                  'color' in item ? (
                    <div key={idx} className="flex items-center">
                      <div className={`w-8 h-8 ${item.color} rounded-full mr-2`}></div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                  ) : null
                )}
              </div>
            ) : charte.title === 'Typographies' ? (
              <div className="space-y-2">
                {charte.content.map((item, idx) =>
                  'text' in item ? (
                    <p key={idx} className={item.className}>{item.text}</p>
                  ) : null
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                {charte.content.map((item, idx) =>
                  'src' in item ? (
                    <img key={idx} src={item.src} alt={item.alt} className="w-12 h-12" />
                  ) : null
                )}
              </div>
            ),
            charte.buttonText
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Presse</h2>
        <p className="text-gray-600 mb-6">Pour toute demande média, contactez-nous à l'adresse suivante :</p>
        <a href="mailto:presse@example.com" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
          presse@example.com
        </a>
      </section>
    </div>
  );
};

export default EspacePresse;