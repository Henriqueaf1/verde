import React from 'react';
import './Navbar.css';
import logo from '../assets/logo2.png';

function Navbar({ onNavigate, user, isAuthenticated }) {
  // Função para gerar as iniciais do nome do usuário, caso não haja imagem
  const getUserInitials = () => {
    if (user && user.name) {
      const names = user.name.split(' ');
      const initials = names[0][0] + (names[1] ? names[1][0] : '');
      return initials.toUpperCase();
    }
    return '';
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      onNavigate('profile'); // Acessa o perfil se estiver autenticado
    } else {
      onNavigate('auth'); // Redireciona para login/cadastro se não estiver autenticado
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo do Projeto" />
      </div>
      <ul className="nav-links">
        <li>
          <button onClick={() => onNavigate('home')}>Página inicial</button>
        </li>
        <li>
          <button onClick={() => onNavigate('images')}>Listagem de Imagens</button>
        </li>
        <li>
          <button onClick={() => onNavigate('addProposal')}>Adicionar Proposta</button>
        </li>
      </ul>
      <div className="profile-container">
        <button className="profile-button" onClick={handleProfileClick}>
          {user.image ? (
            <img src={user.image} alt="Perfil do Usuário" className="profile-image" />
          ) : (
            <span className="profile-initials">{getUserInitials()}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
