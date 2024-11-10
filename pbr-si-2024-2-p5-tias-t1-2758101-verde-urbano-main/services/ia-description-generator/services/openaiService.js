const { OpenAI } = require("openai");
const fs = require("fs");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.gerarDescricaoImagem = async ({
  base64,
  bairro,
  estado,
  pais,
  cidade,
}) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em análise de terrenos para projetos de arborização urbana. Sua principal função é analisar imagens de áreas urbanas vindo do google maps, identificando terrenos baldios ou subutilizados que possam ser aproveitados para o plantio de árvores. Além de identificar as áreas, você deve fornecer uma descrição detalhada sobre as características do solo, a localização e a viabilidade para plantio. Avalie os pontos positivos e negativos dessa área em relação ao seu uso para plantio de árvores, considerando fatores como tipo de solo, clima, acessibilidade e impacto ambiental. Leve em conta considerações climáticas das imagens que são de áreas urbanas no ${pais} no estado de ${estado}, na cidade de ${cidade} perto do bairro ${bairro}.`,
        },
        {
          role: "user",
          content: "Segue uma imagem para análise:",
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 4000,
      temperature: 0,
      tools: [
        {
          type: "function",
          function: {
            name: "conditionsExtractor",
            description:
              "Extrai dados importantes sobre as condições dos terrenos para plantio, categorizados de acordo com um nível de dificuldade de 1 a 5.",
            parameters: {
              type: "object",
              properties: {
                condition_level: {
                  type: "integer",
                  description:
                    "Nível de condição do terreno de 1 a 5. O nível 1 indica condições muito difíceis para o plantio, enquanto o nível 5 indica condições muito favoráveis.",
                  enum: [1, 2, 3, 4, 5],
                },
                explanation_note: {
                  type: "string",
                  description:
                    "Texto breve explicando o motivo da classificação atribuída ao nível de condição do terreno.",
                },
                description: {
                  type: "string",
                  description:
                    "Uma descrição completa e detalhada do que pode ser obervado nos terrenos da imagem, fazendo uma análise sobre a viabilidade do uso desses terrenos para o plantio de vegetação.",
                },
              },
              required: ["condition_level", "explanation_note", "description"],
            },
          },
        },
      ],
    });

    let conditions;
    if (
      response &&
      response.choices &&
      response.choices[0] &&
      response.choices[0].message &&
      response.choices[0].message.tool_calls &&
      response.choices[0].message.tool_calls[0] &&
      response.choices[0].message.tool_calls[0].function &&
      response.choices[0].message.tool_calls[0].function.arguments
    ) {
      conditions = response.choices[0].message.tool_calls[0].function.arguments;
    } else {
      conditions = JSON.stringify({
        condition_level: 0,
        explanation_note: "Não foi possível determinar a condição do terreno",
        description: "Não foi possível determinar a descrição do terreno",
      });
    }

    return conditions;
  } catch (error) {
    throw new Error("Erro ao gerar a descrição da imagem: " + error.message);
  }
};