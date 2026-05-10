function StatReseau({ lignes }) {

  const totalLignes = lignes.length;

  let totalArrets = 0;
  for (let i = 0; i < lignes.length; i++) {
    totalArrets = totalArrets + lignes[i].arrets;
  }

  let ligneMax = lignes[0];
  for (let i = 1; i < lignes.length; i++) {
    if (lignes[i].arrets > ligneMax.arrets) {
      ligneMax = lignes[i];
    }
  }

  return (
    <div className="stat-reseau">
        <h3>Statistiques du réseau</h3>
      <p> Nombre de lignes : <strong>{totalLignes}</strong></p>
      <p> Total d'arrêts : <strong>{totalArrets}</strong></p>
      <p> Ligne avec le plus d'arrêts : <strong>Ligne {ligneMax.numero}</strong> ({ligneMax.arrets} arrêts)</p>
    </div>
  );
}

export default StatReseau;