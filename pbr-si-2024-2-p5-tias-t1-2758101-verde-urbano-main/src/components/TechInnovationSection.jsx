import React, { useEffect } from 'react';
import './TechInnovationSection.css';
import sustainableImage1 from '../assets/sustainable1.png'; // Imagem de inovação sustentável 1
import sustainableImage2 from '../assets/sustainable2.png'; // Imagem de inovação sustentável 2                       
import sustainableImage3 from '../assets/sustainable3.png'; // Imagem de inovação sustentável 2                       

function TechInnovationSection() {

  useEffect(() => {
    const section = document.querySelector('.tech-innovation-section');

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
    <section className="tech-innovation-section">
      <h2>Inovação Tecnológica</h2>

      <div className="tech-content">
        <div className="text-content">
          <p>Combinando tecnologias como reconhecimento de imagem e geolocalização, nosso projeto utiliza modelos avançados para identificar e mapear terrenos baldios em áreas urbanas, promovendo iniciativas de arborização e sustentabilidade.</p>
        </div>
        <div className="image-content">
          <img src={sustainableImage1} alt="Inovação Sustentável 1" className="tech-image" />
        </div>
      </div>

      <div className="tech-content">
        <div className="image-content">
          <img src={sustainableImage2} alt="Inovação Sustentável 2" className="tech-image" />
        </div>
        <div className="text-content">
          <p>Utilizamos a API do Google Maps para exibir, em um mapa interativo, os terrenos identificados, permitindo que empresas e prefeituras planejem ações de plantio de árvores com maior eficiência e precisão.</p>
        </div>
      </div>
      
      <div className="tech-content">
        <div className="text-content">
          <p>Para incentivar proprietários de terrenos a participarem, oferecemos um sistema de benefícios fiscais, como descontos no IPTU, ao cederem suas áreas para projetos de arborização, ajudando a expandir a cobertura verde das cidades.</p>
        </div>
        <div className="image-content">
          <img src={sustainableImage3} alt="Benefício Sustentável" className="tech-image" />
        </div>
      </div>
    </section>
  );
}

export default TechInnovationSection;
