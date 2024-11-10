const openaiService = require("../services/openaiService"); // Serviço para gerar descrições de imagens com OpenAI
const supabaseService = require("../services/supabaseService"); // Serviço para interagir com o Supabase (banco de dados e bucket de imagens)
const { urlToBase64 } = require("../utils/urlToBase64"); // Função utilitária para converter URL de imagem em base64
const { createClient } = require("@supabase/supabase-js"); // Cliente para conectar ao Supabase

// Função para buscar imagens do Supabase e gerar uma descrição para cada uma delas
exports.getImagesDescriptionFromSupabase = async (req, res) => {
  // Extraindo os parâmetros "bairro", "estado", "pais" e "cidade" do corpo da requisição
  const { bairro, estado, pais, cidade } = req.body;

  try {
    // Verifica se o campo "bairro" foi enviado na requisição
    if (!bairro) {
      return res.status(400).json({ error: "O campo 'bairro' é obrigatório." });
    }

    // Busca as imagens armazenadas no bucket do Supabase com base no bairro fornecido
    let imagens = await supabaseService.getImagensDoBucket(bairro);

    // Se não houver imagens, retorna um erro com o status 404
    if (!imagens || imagens.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhuma imagem encontrada para o bairro fornecido." });
    }

    // Converte as imagens de URL para base64 de forma assíncrona
    imagens = await Promise.all(
      imagens.map(async (imagem) => {
        let base64 = await urlToBase64(imagem.url); // Converte a URL da imagem para base64
        return {
          base64: base64,  // A imagem em base64
          url: imagem.url, // A URL original da imagem
          image_data: imagem.image_data, // Dados adicionais da imagem (se houver)
        };
      })
    );

    // Para cada imagem, gera uma descrição utilizando o serviço da OpenAI
    const descricoes = await Promise.all(
      imagens.map(async (imagem) => {
        const p_base64 = imagem.base64 ?? "";  // Base64 da imagem (caso não tenha, usa string vazia)
        const p_bairro = bairro ?? ""; // Bairro (caso não tenha, usa string vazia)
        const p_estado = estado ?? ""; // Estado (caso não tenha, usa string vazia)
        const p_pais = pais ?? ""; // País (caso não tenha, usa string vazia)
        const p_cidade = cidade ?? ""; // Cidade (caso não tenha, usa string vazia)

        // Chama a OpenAI para gerar uma descrição da imagem, com base nos parâmetros fornecidos
        const descricao = await openaiService.gerarDescricaoImagem({
          base64: p_base64,
          bairro: p_bairro,
          estado: p_estado,
          pais: p_pais,
          cidade: p_cidade,
        });
        return {
          imagem, // Dados da imagem
          descricao, // Descrição gerada pela OpenAI
        };
      })
    );

    // Remove o campo base64 de cada objeto de imagem nas descrições
    const descricoesSemBase64 = descricoes.map(({ imagem, descricao }) => {
      // Desestruturar o objeto para remover a chave base64
      const { base64, ...imagemSemBase64 } = imagem;
      return {
        imagem: imagemSemBase64, // Imagem sem o campo base64
        descricao, // Descrição gerada pela OpenAI
      };
    });

    // Salva ou atualiza os dados no Supabase com as novas descrições (upsert)
    let retorno = await supabaseService.upsertLandData(descricoesSemBase64, bairro);

    // Retorna as descrições sem o base64 no corpo da resposta
    res.json(descricoesSemBase64);
  } catch (error) {
    // Caso ocorra algum erro, retorna uma resposta com o erro e o status 500
    console.error("Erro ao buscar imagens do Supabase:", error);
    res.status(500).json({ error: "Erro ao buscar imagens do Supabase." });
  }
};
