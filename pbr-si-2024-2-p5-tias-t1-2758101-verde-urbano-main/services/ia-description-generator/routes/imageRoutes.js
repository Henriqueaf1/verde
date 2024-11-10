const express = require("express");
const router = express.Router();
const multer = require("../utils/urlToBase64");
const imageController = require("../controllers/imageController");

// Rota para buscar imagens de um bairro específico no bucket no Supabase
router.post("/from-supabase", imageController.getImagesDescriptionFromSupabase);

module.exports = router;
