const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

// Rota POST para capturar imagens
router.post("/", imageController.capturarImagens);

module.exports = router;
