import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className='header-titre'>SenTransport</h1>
      <p className='header-soustitre'>Votre guide du transport en commun à Dakar</p>
       <p className='header-date'>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>  
   </header>
  );
}

export default Header;