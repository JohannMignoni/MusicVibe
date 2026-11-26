var express = require("express");
var router = express.Router();

const videoController = require("./videoController");
const { isAuthenticated } = require("../../middlewares/auth");
const videoMulter = require("../../middlewares/videoMulter");  // Importa o Multer para videos
const {uploadValidator} = require("./videoValidator");
const asyncHandler = require("../../middlewares/asyncHandler");

// Rota para exibir o formulário de upload de vídeo (protegida por autenticação)
router.get("/upload", isAuthenticated, videoController.renderUploadPage);

//Rota para processar o upload de vídeo (protegida por autenticação)
router.post("/upload", isAuthenticated, videoMulter.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), uploadValidator, asyncHandler(videoController.uploadVideo));

// Rota para exibir página do vídeo
router.get("/video/:id", isAuthenticated, videoController.renderVideoPage);

// Rota para stream de video
router.get("/video/:id/stream", isAuthenticated, videoController.streamVideo);

module.exports = router;