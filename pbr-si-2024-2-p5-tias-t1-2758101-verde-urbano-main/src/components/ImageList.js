import React, { useState, useEffect } from 'react';
import './ImageList.css';
import LandPlotDetails from './LandPlotDetails';
import terrenoIcon from '../assets/terreno.png';
import { supabase } from '../supabaseClient';

function ImageList() {
  const [images, setImages] = useState([]);
  const [selectedLandPlot, setSelectedLandPlot] = useState(null);

  // Função para capitalizar a primeira letra
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchLandPlots = async () => {
      const { data, error } = await supabase
        .from('land')
        .select('land_picture, land_note, land_name, land_coordinate, land_description, land_note_description');

      if (error) {
        console.error('Erro ao buscar dados:', error);
      } else {
        let dataSorted = data.sort((a, b) => b.land_note - a.land_note);

        dataSorted.map((item) => {
          let landNote = item.land_note;
          if (landNote <= 2) {
            item.land_note = "Terreno Urbanizado";
          }
          else if (landNote == 3) {
            item.land_note = "Terreno Suburbanizado";
          }
          else if (landNote >= 4) {
            item.land_note = "Terreno Baldio";
          }
        });

        const formattedData = dataSorted.map((item) => ({
          imageUrl: item.land_picture,
          soilCondition: item.land_note,
          location: capitalizeFirstLetter(item.land_name), // Capitalizando a primeira letra
          coordinate: item.land_coordinate,
          imageDescription: item.land_description,
          landDescription: item.land_note_description,
        }));
        setImages(formattedData);
      }
    };

    fetchLandPlots();
  }, []);

  useEffect(() => {
    const title = document.querySelector('.image-list-title');
    const subtitle = document.querySelector('.image-list-subtitle');
    const icon = document.querySelector('.image-list-icon');

    if (!selectedLandPlot) {
      icon.classList.remove('animate');
      title.classList.remove('animate');
      subtitle.classList.remove('animate');

      void icon.offsetWidth;

      icon.classList.add('animate');
      title.classList.add('animate');
      subtitle.classList.add('animate');
    }
  }, [selectedLandPlot]);

  const openLandPlotDetails = (landPlot) => {
    setSelectedLandPlot(landPlot);
  };

  const closeLandPlotDetails = () => {
    setSelectedLandPlot(null);
  };

  return (
    <div className="image-list-container">
      {selectedLandPlot ? (
        <LandPlotDetails landPlot={selectedLandPlot} onBack={closeLandPlotDetails} />
      ) : (
        <>
          <div className="header-container">
            <img src={terrenoIcon} alt="Ícone de Terreno" className="image-list-icon" />
            <div className="title-container">
              <h1 className="image-list-title">Terrenos Baldios Identificados</h1>
              <p className="image-list-subtitle">Aqui estão os terrenos baldios identificados pela nossa plataforma</p>
            </div>
          </div>

          <div className="image-list">
            {images.map((image, index) => (
              <div key={index} className="card animate-card" onClick={() => openLandPlotDetails(image)}>
                <img src={image.imageUrl} alt={`Terreno em ${image.location}`} className="card-image" />
                <div className="card-content">
                  <h3>{image.location}</h3>
                  <p><strong>Condição:</strong> {image.soilCondition}</p>
                  <p><strong>Coordenada:</strong> {image.coordinate}</p>
                  <p><strong>Descrição do Terreno:</strong> {image.landDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageList;
