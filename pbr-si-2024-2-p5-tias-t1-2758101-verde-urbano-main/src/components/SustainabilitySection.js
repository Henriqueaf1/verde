import React, { useEffect, useRef } from 'react';
import './SustainabilitySection.css';
import biodiversidadeIcon from '../assets/biodiversidade.png';
import transparenciaIcon from '../assets/transparencia.png';
import comunitarioIcon from '../assets/comunitario.png';

function SustainabilitySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('animate');
            observer.unobserve(section); // Remove o observador após a animação começar
          }
        });
      },
      { threshold: 0.5 } // Inicia a animação quando 50% da seção estiver visível
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="sustainability-section" ref={sectionRef}>
      <div className="sustainability-item">
        <img src={biodiversidadeIcon} alt="Biodiversidade" className="sustainability-icon" />
        <h2>Biodiversidade</h2>
        <p>
          Transformando terrenos baldios em áreas verdes, promovemos a biodiversidade e o equilíbrio ambiental nas cidades.
        </p>
      </div>
      <div className="sustainability-item">
        <img src={transparenciaIcon} alt="Transparência" className="sustainability-icon" />
        <h2>Transparência</h2>
        <p>
          Nosso sistema oferece uma plataforma transparente para rastrear o progresso da recuperação ambiental dos terrenos.
        </p>
      </div>
      <div className="sustainability-item">
        <img src={comunitarioIcon} alt="Engajamento Comunitário" className="sustainability-icon" />
        <h2>Engajamento Comunitário</h2>
        <p>
          Trabalhamos com as comunidades para garantir o sucesso e a sustentabilidade a longo prazo dos projetos de revitalização.
        </p>
      </div>
    </section>
  );
}

export default SustainabilitySection;
