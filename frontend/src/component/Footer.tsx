const Footer = () => {
    return (
        <footer>
            <div className="flex justify-around bg-blue text-white">
                <div className="max-w-50 px-20 py-20">
                    <p><b>Address:</b> 82 Av. Raspail, 94250 Gentilly</p>
                </div>

                <div className="max-w-50 px-20 py-20">
                    <p>adresse</p>
                </div>

                <div className="max-w-50 px-20 py-20">
                    <p>adresse</p>
                </div>
            </div>

            <div className="flex justify-center py-5 bg-silver flex text-black m-0">
                    <p>Copyright © 2018 - 2019 - Tous droits réservés. <a href="" className='text-purplehover'>Mentions légales</a> / <a href="" className='text-purplehover'>Conditions Générales de Vente</a></p>
            </div>

        </footer>
    );
};

export default Footer;