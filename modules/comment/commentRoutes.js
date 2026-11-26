const express = require("express");
const router = express.Router();

const commentController = require("./commentController");
const { isAuthenticated } = require("../../middlewares/auth");
const { commentValidator } = require("./commentValidator");
const asyncHandler = require("../../middlewares/asyncHandler");

// Rota para adicionar um comentário
router.post("/video/:videoId/comment", isAuthenticated, commentValidator, asyncHandler(commentController.addComment));

// Rota para buscar comentários de um vídeo
router.get("/video/:videoId/comments", asyncHandler(commentController.getComments));

// // Rota para editar comentário
// router.put("/video/:videoId/comment/:commentId", authMiddleware, commentController.editComment);

// Exercitando
//router.post("/comment/:commentId/delete", isAuthenticated, asyncHandler(commentController.deleteComment));

module.exports = router;