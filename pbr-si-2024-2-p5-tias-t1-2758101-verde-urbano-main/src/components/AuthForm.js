import React, { useState } from 'react';
import loginIcon from '../assets/login.png';
import './AuthForm.css';

function AuthForm({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setUserType(1);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister(username, email, password, userType);
    }
  };

  return (
    <div className="auth-form-container">
      <div className={`panel ${isLogin ? 'login' : 'register'}`}>
        <div className="side-panel">
          <div className="icon-animated-container">
            <img src={loginIcon} alt="Login Icon" className="icon-animated" />
          </div>
          <h2>{isLogin ? "Bem - vindo" : "Crie sua conta"}</h2>
          <p>{isLogin ? "Acesse sua conta agora" : "Junte-se à nossa plataforma"}</p>
          <button className="toggle-btn" onClick={handleToggleForm}>
            {isLogin ? "Criar conta" : "Entrar"}
          </button>
        </div>

        <div className="form-panel">
          <h2>{isLogin ? "ENTRAR" : "CRIE SUA CONTA"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="user-type-container">
                  <button
                    type="button"
                    className={`user-type-btn ${userType === 1 ? 'active' : ''}`}
                    onClick={() => setUserType(1)}
                  >
                    Proprietário
                  </button>
                  <button
                    type="button"
                    className={`user-type-btn ${userType === 2 ? 'active' : ''}`}
                    onClick={() => setUserType(2)}
                  >
                    Empresa
                  </button>
                  <button
                    type="button"
                    className={`user-type-btn ${userType === 3 ? 'active' : ''}`}
                    onClick={() => setUserType(3)}
                  >
                    Prefeitura
                  </button>
                  <button
                    type="button"
                    className={`user-type-btn ${userType === 4 ? 'active' : ''}`}
                    onClick={() => setUserType(4)}
                  >
                    Voluntário
                  </button>
                </div>
                <label>
                  <i className="icon user-icon"></i>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </>
            )}
            <label>
              <i className="icon email-icon"></i>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <i className="icon password-icon"></i>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="submit-btn">
              {isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
