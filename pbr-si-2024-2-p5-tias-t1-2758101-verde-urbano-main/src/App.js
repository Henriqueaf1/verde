import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SustainabilitySection from './components/SustainabilitySection';
import TechInnovationSection from './components/TechInnovationSection';
import BenefitsSection from './components/BenefitsSection';
import CommunityImpactSection from './components/CommunityImpactSection';
import ImageList from './components/ImageList';
import AddProposal from './components/AddProposal';
import Profile from './components/Profile';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import NotificationPopup from './components/NotificationPopup'; // Importando o novo componente
import { supabase } from './supabaseClient';
import CryptoJS from 'crypto-js';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'Teste',
    email: 'teste@email.com',
    image: '',
  });
  const [notification, setNotification] = useState(null); // Estado para notificação

  const handlePageChange = (page) => {
    if (page === 'profile' && !isAuthenticated) {
      setCurrentPage('auth');
    } else {
      setCurrentPage(page);
    }
  };

  const handleLogin = async (email, password) => {
    const hashedPassword = generateHash(password);
    let { count } = await supabase
      .from('user')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .eq('password', hashedPassword);

    if (count == 0) {
      setNotification({ message: 'Email e/ou senha incorretos.', type: 'error' });
      return;
    }

    setIsAuthenticated(true);
    setCurrentPage('profile');
  };

  const generateHash = (inputText) => {
    const sha1Hash = CryptoJS.SHA1(inputText).toString();
    return sha1Hash;
  };

  const validaExistenciaEmail = async (email) => {
    try {
      let { count } = await supabase
        .from('user')
        .select('*', { count: 'exact', head: true })
        .eq('email', email);

      if (count > 0) {
        return true;
      }
      return false;

    } catch (error) {
      throw error;
    }
  }

  const handleRegister = async (username, email, password, userType) => {
    try {
      const emailExists = await validaExistenciaEmail(email);
      if (emailExists) {
        console.error('Email já cadastrado.');
        setNotification({ message: `Email já cadastrado.`, type: 'error' });
        return;
      }

      const hashedPassword = generateHash(password);
      const { data, error } = await supabase
        .from('user')
        .insert([{
          name: username,
          email: email,
          password: hashedPassword,
          user_type_id: userType
        }]);

      if (error) {
        console.error('Erro ao cadastrar o usuário:', error.message);
        setNotification({ message: `Erro ao cadastrar o usuário: ${error.message}`, type: 'error' });
        return;
      }

      setUser({ name: username, email });
      setIsAuthenticated(true);
      //TODO: Redireciona o cara pra tela de login
      //TODO: Tem que ter como acessar a tela de perfil do usuário por dentro do sistema
      setCurrentPage('profile');
      setNotification({ message: `Usuário ${username} cadastrado com sucesso!`, type: 'success' });
    } catch (error) {
      console.error('Erro inesperado ao cadastrar o usuário:', error);
      setNotification({ message: `Erro inesperado ao cadastrar o usuário: ${error.message}`, type: 'error' });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handlePageChange} user={user} />

      {currentPage === 'home' && (
        <>
          <HeroSection />
          <SustainabilitySection />
          <TechInnovationSection />
          <BenefitsSection />
          <CommunityImpactSection />
        </>
      )}
      {currentPage === 'images' && <ImageList />}
      {currentPage === 'addProposal' && <AddProposal />}
      {currentPage === 'profile' && isAuthenticated && <Profile user={user} />}
      {currentPage === 'auth' && (
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      )}
      {currentPage === 'privacy-policy' && <PrivacyPolicyPage />}
      {currentPage === 'terms-of-service' && <TermsOfServicePage onNavigate={handlePageChange} />}

      <Footer onNavigate={handlePageChange} />

      {notification && (
        <NotificationPopup
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default App;
