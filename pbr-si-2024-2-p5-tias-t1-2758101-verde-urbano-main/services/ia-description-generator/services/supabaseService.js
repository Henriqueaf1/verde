const { createClient } = require("@supabase/supabase-js");
const { extractCoordinatesFromName } = require("../utils/extractCoordinate");
require("dotenv").config();

// Configuração do Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para buscar imagens de uma pasta específica no Supabase
exports.getImagensDoBucket = async (pasta) => {
  const { data, error } = await supabase.storage
    .from("hostBucket")
    .list(pasta, {
      limit: 100, // Limite opcional, ajuste conforme necessário
      offset: 0, // Offset opcional para paginação, ajuste conforme necessário
    });

  if (error) {
    throw new Error("Erro ao buscar imagens no Supabase.");
  }

  // Verifica se há dados retornados
  if (!data || data.length === 0) {
    return [];
  }

  // Itera sobre cada arquivo e gera a URL pública
  const imagensComUrls = data.map((imagem) => {
    const { data, error } = supabase.storage
      .from("hostBucket")
      .getPublicUrl(`${pasta}/${imagem.name}`);

    if (error) {
      console.error(
        `Erro ao gerar URL pública para a imagem ${imagem.name}:`,
        error
      );
      return null; // Se falhar, retorna null para essa imagem
    }

    return {
      image_data: imagem,
      url: data.publicUrl, // URL pública da imagem
    };
  });

  // Remove os itens nulos (caso algum erro tenha ocorrido) e retorna o array de URLs
  return imagensComUrls.filter((imagem) => imagem !== null);
};

exports.upsertLandData = async (imagensDescritas, bairro) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  for (const { imagem, descricao } of imagensDescritas) {
    const {
      url,
      image_data: { id, created_at },
    } = imagem;

    const { condition_level, explanation_note, description } =
      JSON.parse(descricao);
    // Extrair as coordenadas do nome da imagem
    const coordinates = extractCoordinatesFromName(imagem.image_data.name);

    const { error } = await supabase.from("land").upsert(
      {
        id,
        created_at,
        land_description: description,
        land_note: condition_level,
        land_name: bairro,
        land_picture: url,
        land_coordinate: coordinates,
        land_note_description: explanation_note,
      },
      {
        onConflict: ["land_picture"],
      }
    );

    if (error) {
      console.error(
        "Erro ao realizar UPSERT na tabela public.land:",
        error.message
      );
    } else {
      console.log(`UPSERT realizado com sucesso para a imagem: ${url}`);
    }
  }
};

