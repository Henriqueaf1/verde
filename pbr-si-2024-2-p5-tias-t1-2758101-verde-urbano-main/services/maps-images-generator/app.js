const express = require("express");
require("dotenv").config();
const imageRoutes = require("./routes/imageRoutes");

const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON no corpo da requisição

// Registrar as rotas de imagem
app.use("/capturar-imagens", imageRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
