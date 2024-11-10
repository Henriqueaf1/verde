import React, { useEffect, useRef } from 'react';
import './BenefitsSection.css';

function BenefitsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.8;

      if (sectionTop < triggerPoint) {
        sectionRef.current.classList.add('visible');
        window.removeEventListener('scroll', handleScroll); // Remove o listener após ativação
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="benefits-section" ref={sectionRef}>
      <h2>Benefícios para Você</h2>
      <ul className="benefits-list">
        <li className="benefit-item">
          <div className="benefit-text">
            Contribua diretamente para a sustentabilidade urbana e ajude a transformar terrenos baldios em áreas verdes.
          </div>
        </li>
        <li className="benefit-item">
          <div className="benefit-text">
            Participe de um projeto inovador e tenha voz ativa em propostas comunitárias, colaborando para uma cidade mais saudável.
          </div>
        </li>
        <li className="benefit-item">
          <div className="benefit-text">
            Acesse uma plataforma intuitiva e interativa que facilita o monitoramento e a gestão de ações de plantio em tempo real.
          </div>
        </li>
        <li className="benefit-item">
          <div className="benefit-text">
            Obtenha incentivos fiscais, como descontos no IPTU, ao ceder terrenos para projetos de arborização urbana.
          </div>
        </li>
        <li className="benefit-item">
          <div className="benefit-text">
            Ajude a reduzir as ilhas de calor e melhorar a qualidade do ar, contribuindo para uma cidade mais agradável para todos.
          </div>
        </li>
        <li className="benefit-item">
          <div className="benefit-text">
            Tenha acesso a relatórios e atualizações constantes sobre os projetos, promovendo transparência e envolvimento contínuo.
          </div>
        </li>
        <li className="benefit-item">
          <div className="benefit-text">
            Desenvolva um senso de comunidade e responsabilidade ambiental, sabendo que suas ações trazem benefícios concretos para o futuro.
          </div>
        </li>
      </ul>
    </section>
  );
}

export default BenefitsSection;
