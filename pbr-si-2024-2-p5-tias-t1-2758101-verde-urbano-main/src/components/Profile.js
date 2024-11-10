import React, { useEffect } from 'react';
import './Profile.css';
import defaultProfileImage from '../assets/perfil.png';

function Profile({ user }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile-page-container">
      <div className="profile-box">
        {/* Seção Esquerda */}
        <div className="profile-left-section">
          <div className="profile-photo-section">
            {user.image ? (
              <img src={user.image} alt="Foto do Usuário" className="profile-photo" />
            ) : (
              <img src={defaultProfileImage} alt="Foto Padrão" className="profile-photo" />
            )}
          </div>
          <div className="welcome-message">
            <h2>Foto de perfil</h2>
          </div>
        </div>

        {/* Seção Direita */}
        <div className="profile-right-section">
          <h2>Informações do Perfil</h2>
          <div className="profile-info-section">
            <div className="profile-field">
              <label>Nome*</label>
              <span>{user.name}</span>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
