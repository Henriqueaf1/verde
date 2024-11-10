// PrivacyPolicyPage.js
import React, { useEffect } from 'react';
import './PrivacyPolicyPage.css';

function PrivacyPolicyPage() {
  useEffect(() => {
    // Rola para o topo da página ao carregar
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="privacy-policy-page fade-in">
      <h1>Política de Privacidade</h1>
      <p className="update-date">Última atualização: 01 de Novembro de 2024</p>

      <h2>1. Introdução</h2>
      <p>Bem-vindo à nossa Política de Privacidade. Esta página descreve como coletamos, usamos, protegemos e gerenciamos suas informações pessoais quando você utiliza os serviços da nossa plataforma Verde Urbano. Valorizamos a sua privacidade e estamos comprometidos em proteger seus dados pessoais.</p>

      <h2>2. Informações que Coletamos</h2>
      <p>Coletamos informações pessoais e não pessoais para oferecer uma experiência aprimorada. As informações podem incluir:</p>
      <ul>
        <li>Informações fornecidas por você: Nome, endereço de email, número de telefone, localização e preferências.</li>
        <li>Dados de uso: Dados sobre como você interage com a plataforma, como páginas visitadas, tempo de navegação e histórico de ações.</li>
        <li>Informações automáticas: Coletamos automaticamente alguns dados através de cookies e tecnologias similares, como seu endereço IP, tipo de navegador e dispositivo.</li>
      </ul>

      <h2>3. Uso de Cookies e Tecnologias Semelhantes</h2>
      <p>Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdo, e coletar informações de uso. Você pode desativar os cookies no seu navegador, mas isso pode afetar a funcionalidade da plataforma.</p>

      <h2>4. Como Usamos Suas Informações</h2>
      <p>Utilizamos as informações para diversas finalidades, incluindo:</p>
      <ul>
        <li>Personalizar sua experiência e oferecer serviços adaptados às suas necessidades.</li>
        <li>Fornecer suporte ao cliente e responder às suas dúvidas.</li>
        <li>Enviar atualizações e notificações sobre o projeto e oportunidades de participação.</li>
        <li>Melhorar a plataforma, com base no feedback e nas análises de uso.</li>
      </ul>

      <h2>5. Compartilhamento de Informações</h2>
      <p>Não compartilhamos suas informações pessoais com terceiros, exceto:</p>
      <ul>
        <li>Quando necessário para cumprir requisitos legais ou solicitações governamentais.</li>
        <li>Para proteger nossos direitos e segurança, bem como dos usuários da plataforma.</li>
        <li>Em casos de parceria com terceiros para análise e melhoria do serviço, sempre garantindo a segurança dos dados.</li>
      </ul>

      <h2>6. Segurança dos Dados</h2>
      <p>Adotamos medidas de segurança rigorosas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia, firewalls e restrições de acesso para garantir a segurança dos seus dados.</p>

      <h2>7. Retenção de Dados</h2>
      <p>Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletadas, salvo exigências legais em contrário.</p>

      <h2>8. Seus Direitos</h2>
      <p>Você tem direitos sobre os dados pessoais que coletamos, incluindo:</p>
      <ul>
        <li>Direito de acesso: Solicitar uma cópia dos seus dados armazenados.</li>
        <li>Direito de retificação: Corrigir informações incorretas ou desatualizadas.</li>
        <li>Direito de exclusão: Solicitar a exclusão dos seus dados pessoais, salvo exigências legais.</li>
        <li>Direito de restrição de processamento: Limitar o uso dos seus dados em determinadas circunstâncias.</li>
      </ul>

      <h2>9. Alterações nesta Política</h2>
      <p>Poderemos atualizar nossa Política de Privacidade periodicamente para refletir mudanças na legislação ou nas práticas de proteção de dados. Recomendamos que você revise esta página regularmente para se manter informado sobre quaisquer alterações.</p>

      <h2>10. Contato</h2>
      <p>Se você tiver dúvidas, preocupações ou solicitações sobre nossa Política de Privacidade ou sobre o uso dos seus dados, entre em contato conosco pelo email contato@verdeurbano.com.</p>
    </section>
  );
}

export default PrivacyPolicyPage;
