const { default: axios } = require("axios");

exports.urlToBase64 = async (imageURL) => {
  try {
    const response = await axios.get(imageURL, {
      responseType: "arraybuffer",
    });
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    return base64Image;
  } catch (error) {
    console.error("Erro ao baixar a imagem:", error);
    throw error;
  }
};
