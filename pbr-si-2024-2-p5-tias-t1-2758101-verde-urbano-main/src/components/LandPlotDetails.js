import React, { useEffect, useState } from 'react';
import './LandPlotDetails.css';

function LandPlotDetails({ landPlot, onBack, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableFields, setEditableFields] = useState({
        location: landPlot.location,
        imageDescription: landPlot.imageDescription,
        soilCondition: landPlot.soilCondition,
        latitude: landPlot.coordinate.split(',')[0],
        longitude: landPlot.coordinate.split(',')[1],
        landDescription: landPlot.landDescription
    });

    // Função para capitalizar a primeira letra
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        const title = document.querySelector('.land-plot-title');
        const subtitle = document.querySelector('.land-plot-subtitle');
        const image = document.querySelector('.land-plot-image img');
        const details = document.querySelectorAll('.detail-item');

        title.classList.add('animate');
        subtitle.classList.add('animate');
        image.classList.add('animate');
        details.forEach((item, index) => {
            setTimeout(() => item.classList.add('animate'), index * 150);
        });
    }, []);

    // Alternar modo de edição
    const toggleEdit = () => {
        if (isEditing && onSave) {
            onSave(editableFields); // Salva as informações ao sair do modo de edição
        }
        setIsEditing(!isEditing);
    };

    // Manipulador para mudanças nos campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    // Gerar URL para o Google Maps com base em latitude, longitude ou endereço
    const getMapUrl = () => {
        const { latitude, longitude, location } = editableFields;
        if (latitude && longitude) {
            return `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
        } else if (location) {
            return `https://www.google.com/maps?q=${encodeURIComponent(location)}&z=15&output=embed`;
        }
        return null;
    };

    return (
        <div className="land-plot-details-container">
            {/* Botão de Voltar e botão de Editar/Salvar */}
            <div className="header-buttons">
                <button onClick={onBack} className="back-button">Voltar para a Lista</button>
            </div>

            {/* Título (nome do terreno) e subtítulo (descrição) */}
            <h1 className="land-plot-title">
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={editableFields.location}
                        onChange={handleChange}
                        placeholder="Nome do Terreno"
                    />
                ) : (
                    capitalizeFirstLetter(editableFields.location)
                )}
            </h1>
            <p className="land-plot-subtitle">
                {isEditing ? (
                    <input
                        type="text"
                        name="description"
                        value={editableFields.imageDescription}
                        onChange={handleChange}
                        placeholder="Descrição breve do terreno"
                    />
                ) : (
                    editableFields.imageDescription
                )}
            </p>

            {/* Imagem principal do terreno */}
            <div className="land-plot-image">
                <img src={landPlot.imageUrl} alt={`Visualização do terreno ${editableFields.name}`} />
            </div>

            {/* Detalhes do terreno em duas colunas com opção de edição */}
            <section className="land-plot-details">
                <div className="detail-item">
                    <h3>Latitude</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="latitude"
                            value={editableFields.latitude}
                            onChange={handleChange}
                            placeholder="Digite a latitude do terreno"
                        />
                    ) : (
                        <p>{editableFields.latitude || "Latitude não disponível"}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Longitude</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="longitude"
                            value={editableFields.longitude}
                            onChange={handleChange}
                            placeholder="Digite a longitude do terreno"
                        />
                    ) : (
                        <p>{editableFields.longitude || "Longitude não disponível"}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Tipo de Solo</h3>
                    {isEditing ? (
                        <textarea
                            name="soilCondition"
                            value={editableFields.soilCondition}
                            onChange={handleChange}
                            placeholder="Descreva o tipo de solo"
                        />
                    ) : (
                        <p>{editableFields.soilCondition}</p>
                    )}
                </div>
            </section>

            {/* Mapa do Google Maps com base em latitude e longitude ou endereço */}
            {getMapUrl() ? (
                <div className="map-container">
                    <iframe
                        title="Google Maps Location"
                        src={getMapUrl()}
                        frameBorder="0"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            ) : (
                <p style={{ color: '#555', marginTop: '20px' }}>Localização no mapa não disponível</p>
            )}
        </div>
    );
}

export default LandPlotDetails;
