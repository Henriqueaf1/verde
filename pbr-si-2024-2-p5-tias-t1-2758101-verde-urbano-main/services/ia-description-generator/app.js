const express = require("express");
const imageRoutes = require("./routes/imageRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Usar JSON no corpo das requisições
app.use(express.json());

// Rota principal para imagens
app.use("/images", imageRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
