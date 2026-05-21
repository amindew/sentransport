import './Recherche.css';
function Recherche({ valeur, onChange }) {
return (
<div className="recherche" style={{ display: "flex", alignSelf: "center", gap: "8px" }}>
<input
type="text"
className="recherche-input"
placeholder="Rechercher une ligne (depart, arrivee)..."
value={valeur}
onChange={e => onChange(e.target.value)}
/>
</div>
);
}
export default Recherche;