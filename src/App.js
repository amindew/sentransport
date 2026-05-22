import { useState, useEffect } from 'react';
import './App.css';
import Carte from './Carte';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';

function App() {
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [valeurRecherche, setValeurRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbrRecherches, setNbrRecherches] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/lignes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then(data => {
        setLignes(data);
        setChargement(false);
      })
      .catch(error => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

function chargerLignes() {
  setChargement(true);
  setNbrRecherches(0); 
  fetch("http://localhost:5000/lignes")
    .then(response => {
      if (!response.ok) throw new Error("Erreur serveur : " + response.status);
      return response.json();
    })
    .then(data => {
      setLignes(data);
      setChargement(false);
    })
    .catch(error => {
      setErreur(error.message);
      setChargement(false);
    });
} 
useEffect(() => {
  chargerLignes();
}, []);

  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(valeurRecherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(valeurRecherche.toLowerCase()) ||
    l.numero.includes(valeurRecherche)
  );

  function handleClickLigne(ligne) {
  if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
    setLigneSelectionnee(null);
   } else {
    fetch(`http://localhost:5000/lignes/${ligne.id}`)
      .then(response => response.json())
      .then(data => setLigneSelectionnee(data));
   }
  }

  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">Chargement des lignes...</p>
        </main>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <p>Vous avez effectué {nbrRecherches} recherche(s).</p>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Recherche
            valeur={valeurRecherche}
            onChange={(val) => {
              if (valeurRecherche === "" && val !== "") {
                setNbrRecherches(nbrRecherches + 1);
              }
              setValeurRecherche(val);
            }}
          />
          <button onClick={() => setValeurRecherche("")}>Effacer</button>
          <button onClick={chargerLignes}>Recharger</button>
        </div>


        {lignesFiltrees.length === 0 ? (
          <p className="resultat-recherche-nulle">Aucune ligne trouvée</p>
        ) : (
          <p className="resultat-recherche">
            {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
          </p>
        )}

        {lignesFiltrees.map(ligne => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
            onClick={() => handleClickLigne(ligne)}
          />
        ))}

        {ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
        <Carte />
      </main>
      <Footer />
    </div>
  );
}

export default App;