import React from 'react'
import { useNavigate } from 'react-router-dom'

function NousConnaitre() {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/NosProjets')
  }

  return (
    <div style={styles.container}>
      {/** SECTION HERO */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Bienvenue chez Gestiny</h1>
          <p style={styles.heroSubtitle}>Innovation, Recherche et Bien-être pour Tous</p>
          <button style={styles.ctaButton} onClick={handleNavigate}>
            Découvrir nos projets
          </button>
        </div>
      </section>

      {/** SECTION À PROPOS */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>À propos de Gestiny</h2>
        <p style={styles.aboutText}>
          Gestiny est un laboratoire pharmaceutique avant-gardiste, spécialisé dans la conception de
          solutions médicales de nouvelle génération. En alliant recherche de pointe, collaboration
          internationale et technologies émergentes, notre engagement est de repenser la santé pour
          qu’elle soit plus accessible, plus efficace et plus humaine. Nous croyons fermement que
          chaque innovation nous rapproche d’un avenir où la prévention, le bien-être et la guérison
          ne font qu’un, et où chaque individu bénéficie d’un accompagnement personnalisé.
        </p>
      </section>

      {/** SECTION NOS VALEURS */}
      <section style={styles.valuesSection}>
        <h2 style={styles.sectionTitle}>Nos Valeurs</h2>
        <div style={styles.valuesContainer}>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>🔬</div>
            <h3 style={styles.valueTitle}>Innovation</h3>
            <p style={styles.valueDescription}>
              Nous investissons constamment dans la recherche pour offrir des solutions à la pointe
              de la technologie médicale.
            </p>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>❤️</div>
            <h3 style={styles.valueTitle}>Bien-être</h3>
            <p style={styles.valueDescription}>
              La santé et la satisfaction de nos patients sont notre priorité absolue.
            </p>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>🌍</div>
            <h3 style={styles.valueTitle}>Responsabilité</h3>
            <p style={styles.valueDescription}>
              Nous nous engageons à respecter l’environnement et à promouvoir des pratiques
              responsables dans toutes nos activités.
            </p>
          </div>
        </div>
      </section>

      {/** SECTION NOS LABORATOIRES */}
      <section style={styles.labsSection}>
        <h2 style={styles.sectionTitle}>Nos Laboratoires</h2>
        <div style={styles.labsContainer}>
          <div style={styles.labCard}>
            <img
              src="https://images.unsplash.com/photo-1581093588391-c34384f3f872"
              alt="Laboratoire 1"
              style={styles.labImage}
            />
            <h3 style={styles.labTitle}>Laboratoire de Génétique</h3>
            <p style={styles.labDescription}>
              Spécialisé dans l’étude du génome humain pour des thérapies personnalisées.
            </p>
          </div>
          <div style={styles.labCard}>
            <img
              src="https://images.unsplash.com/photo-1579154205161-3a8114c71d6c"
              alt="Laboratoire 2"
              style={styles.labImage}
            />
            <h3 style={styles.labTitle}>Laboratoire d’Immunologie</h3>
            <p style={styles.labDescription}>
              Recherche et développement de vaccins et d’anticorps pour renforcer l’immunité.
            </p>
          </div>
          <div style={styles.labCard}>
            <img
              src="https://images.unsplash.com/photo-1608219504998-0c0ec4f35e45"
              alt="Laboratoire 3"
              style={styles.labImage}
            />
            <h3 style={styles.labTitle}>Laboratoire de Pharmacologie</h3>
            <p style={styles.labDescription}>
              Tests cliniques et validation de nouveaux médicaments.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NousConnaitre

/**
 * Styles inline (vous pouvez opter pour un fichier CSS/SCSS, styled-components, etc.)
 */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  heroSection: {
    position: 'relative',
    minHeight: '70vh',
    background:
      'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0,0,0,0.3)), url("/images/Bg-nous-Connaître.webp") center/cover no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    borderRadius: ' 80px 10px 80px 10px',
  },
  heroContent: {
    textAlign: 'center',
    color: '#fff',
    maxWidth: '600px',
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  ctaButton: {
    backgroundColor: '#ff6f61',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1rem',
    borderRadius: '30px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },

  aboutSection: {
    backgroundColor: '#fff',
    padding: '50px 20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  aboutText: {
    maxWidth: '800px',
    margin: '0 auto',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    textAlign: 'justify',
  },

  valuesSection: {
    backgroundColor: '#f9f9f9',
    padding: '50px 20px',
    textAlign: 'center',
  },
  valuesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '30px',
  },
  valueCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '280px',
    textAlign: 'center',
  },
  valueIcon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  valueTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  valueDescription: {
    fontSize: '0.95rem',
    lineHeight: '1.4',
  },

  labsSection: {
    backgroundColor: '#fff',
    padding: '50px 20px',
    textAlign: 'center',
  },
  labsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '30px',
  },
  labCard: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '300px',
    padding: '20px',
    textAlign: 'center',
  },
  labImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  labTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  labDescription: {
    fontSize: '0.95rem',
    lineHeight: '1.4',
  },

  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.9rem',
  },
  contactLink: {
    marginLeft: '5px',
    color: '#ff6f61',
    cursor: 'pointer',
  },
}
