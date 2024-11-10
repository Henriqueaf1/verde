import React, { useEffect } from 'react';
import './CommunityImpactSection.css';

function CommunityImpactSection() {

  useEffect(() => {
    const section = document.querySelector('.community-impact-section');

    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="community-impact-section">
      <h2>Impacto Comunitário</h2>

      <div className="impact-content">
        <div className="text-content">
          <p>Nosso projeto vai além de transformar terrenos baldios: ele visa criar verdadeiros oásis urbanos, onde antes havia abandono. Esses espaços revitalizados se tornam áreas de convivência e lazer, promovendo o crescimento de áreas verdes que impactam diretamente a qualidade de vida e a saúde mental dos moradores. Com árvores e vegetação nativa, os locais antes negligenciados ganham vida, oferecendo sombra, ar fresco e um ambiente mais saudável para todos.</p>
        </div>
      </div>

      <div className="impact-content reverse">
        <div className="text-content">
          <p>Além de contribuir para a beleza estética da vizinhança, esses espaços ajudam a combater as ilhas de calor que tanto afetam as cidades, diminuindo a poluição do ar e tornando o clima local mais ameno. Cada área revitalizada se torna um ponto de encontro seguro e inspirador, onde a comunidade pode realizar atividades ao ar livre, cultivar relacionamentos e participar de práticas de educação ambiental, promovendo conhecimento e respeito pela natureza.</p>
        </div>
      </div>

      <div className="impact-content">
        <div className="text-content">
          <p>Nosso projeto conecta cidadãos em torno de um propósito comum: construir uma cidade mais sustentável e integrada. Por meio da participação ativa e do compromisso ambiental, promovemos uma cultura de responsabilidade compartilhada, onde cada ação faz diferença. Cada morador que contribui com o projeto está, de fato, construindo um legado.</p>
        </div>
      </div>

      <div className="impact-content">
        <div className="text-content-phrase">
          <p>Um presente para a atual geração e um futuro melhor para as próximas, enraizando valores de sustentabilidade e união que perdurarão no tempo.</p>
        </div>
      </div>
    </section>
  );
}

export default CommunityImpactSection;
