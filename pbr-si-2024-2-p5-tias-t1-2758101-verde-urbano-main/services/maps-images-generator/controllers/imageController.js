const imageService = require("../services/imageService"); // Serviço responsável por capturar as imagens

// Função para capturar imagens de uma região específica com base em coordenadas
exports.capturarImagens = async (req, res) => {
  // Extraindo os parâmetros da requisição, com valores padrão para alguns parâmetros
  const {
    latitude,    // Latitude da localização
    longitude,   // Longitude da localização
    bairro,      // Bairro de referência
    zoom = 16,   // Nível de zoom para a captura da imagem (valor padrão é 16)
    largura = 640, // Largura da imagem (valor padrão é 640px)
    altura = 640,  // Altura da imagem (valor padrão é 640px)
    quantidade = 5, // Número de imagens a serem capturadas (valor padrão é 5)
  } = req.body;

  // Verifica se a latitude, longitude e bairro foram fornecidos, retornando erro se não forem
  if (!latitude || !longitude || !bairro) {
    return res
      .status(400)
      .send("Latitude, longitude e bairro são obrigatórios!"); // Resposta de erro com status 400
  }

  try {
    // Chama o serviço de imagem para capturar as imagens da região com os parâmetros fornecidos
    await imageService.capturarImagensRegiao(
      latitude,    // Latitude fornecida
      longitude,   // Longitude fornecida
      bairro,      // Bairro fornecido
      zoom,        // Nível de zoom
      largura,     // Largura da imagem
      altura,      // Altura da imagem
      quantidade   // Quantidade de imagens a serem capturadas
    );

    // Responde com uma mensagem indicando que a captura foi iniciada para o bairro especificado
    res.send(`Captura de imagens iniciada para o bairro ${bairro}.`);
  } catch (error) {
    // Caso ocorra um erro, registra o erro no console e retorna uma mensagem de erro
    console.error(error);
    res.status(500).send("Erro ao capturar imagens."); // Resposta de erro com status 500
  }
};
