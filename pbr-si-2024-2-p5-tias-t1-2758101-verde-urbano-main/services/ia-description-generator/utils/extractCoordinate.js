exports.extractCoordinatesFromName = (imageName) => {
  // Usar expressão regular para extrair a latitude e longitude do nome da imagem
  const regex = /imagem_(-?\d+\.\d+)_(-?\d+\.\d+)/;
  const match = imageName.match(regex);
  if (match) {
    return `${match[1]}, ${match[2]}`; // Retorna como string "latitude, longitude"
  }
  return null;
};
