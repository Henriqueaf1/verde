const axios = require("axios");
const supabase = require("../utils/supabaseClient");

// Função para deslocar latitude e longitude por uma distância específica
function deslocarCoordenadas(latitude, longitude, metrosLat, metrosLon) {
  const novaLatitude = latitude + metrosLat / 111320; // 1 grau de latitude = ~111.32 km
  const novaLongitude =
    longitude + metrosLon / (111320 * Math.cos(latitude * (Math.PI / 180)));
  return { latitude: novaLatitude, longitude: novaLongitude };
}

// Função para calcular a distância ideal entre pontos, com base no zoom
function calcularDistanciaEntrePontos(zoom, largura) {
  const metrosPorPixel = {
    21: 0.5,
    20: 1,
    19: 2,
    18: 4,
    17: 8,
    16: 16,
    15: 32,
    14: 64,
  };

  const metrosPorPixelZoom = metrosPorPixel[zoom] || 16;
  const distancia = largura * metrosPorPixelZoom;
  return distancia;
}

// Função para gerar uma grade de coordenadas
function gerarCoordenadasGrade(
  latitudeInicial,
  longitudeInicial,
  zoom,
  largura,
  quantidade
) {
  let coordenadas = [];
  const distanciaEntrePontos = calcularDistanciaEntrePontos(zoom, largura);

  for (let i = 0; i < quantidade; i++) {
    for (let j = 0; j < quantidade; j++) {
      const deslocamentoLat = i * distanciaEntrePontos;
      const deslocamentoLon = j * distanciaEntrePontos;

      const { latitude, longitude } = deslocarCoordenadas(
        latitudeInicial,
        longitudeInicial,
        deslocamentoLat,
        deslocamentoLon
      );
      coordenadas.push({ latitude, longitude });
    }
  }

  return coordenadas;
}

// Função principal para capturar imagens de uma região
async function capturarImagensRegiao(
  latitude,
  longitude,
  bairro,
  zoom,
  largura,
  altura,
  quantidade
) {
  console.log(`Iniciando captura de imagens para o bairro: ${bairro}...`);

  const coordenadas = gerarCoordenadasGrade(
    parseFloat(latitude),
    parseFloat(longitude),
    parseFloat(zoom),
    largura,
    quantidade
  );

  for (let index = 0; index < coordenadas.length; index++) {
    const { latitude, longitude } = coordenadas[index];
    // A pasta será apenas o nome do bairro
    const pasta = `${bairro}`; // Diretório de destino será apenas o nome do bairro
    const nomeArquivo = `imagem_${latitude}_${longitude}.png`; // Nome do arquivo contém as coordenadas

    await baixarImagemTerrenoESalvarNoSupabase(
      latitude,
      longitude,
      zoom,
      largura,
      altura,
      nomeArquivo,
      pasta
    );
  }

  console.log(
    `Imagens de ${coordenadas.length} terrenos baixadas e salvas no Supabase!`
  );
}

// Função para baixar a imagem do Google Maps e fazer o upload para o Supabase
async function baixarImagemTerrenoESalvarNoSupabase(
  latitude,
  longitude,
  zoom,
  largura,
  altura,
  nomeArquivo,
  pasta
) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${largura}x${altura}&maptype=satellite&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Fazer o upload da imagem para o Supabase
    const { error } = await supabase.storage
      .from("hostBucket") // Substitua pelo nome do seu bucket
      .upload(`${pasta}/${nomeArquivo}`, response.data, {
        contentType: "image/png",
      });

    if (error) {
      console.error(`Erro ao fazer upload para o Supabase: ${error.message}`);
      throw error;
    }

    console.log(`Imagem ${nomeArquivo} salva no Supabase na pasta ${pasta}`);
  } catch (error) {
    console.error(`Erro ao baixar imagem: ${error.message}`);
    throw new Error("Erro ao baixar a imagem do Google Maps.");
  }
}

module.exports = {
  capturarImagensRegiao,
};
