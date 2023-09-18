const express = require("express");

const router = express.Router();

const {
    getCard, deleteCardById, createCard, likeCard, dislikeCard,
} = require("../controlers/cards");

const {
    validationCreateCard,
    validationCardId,
} = require("../middleware/validation");

router.get("/cards", getCard);
router.post("/cards", validationCreateCard, createCard);
router.delete("/cards/:cardId", validationCardId, deleteCardById);

router.put("/cards/:cardId/likes", validationCardId, likeCard);
router.delete("/cards/:cardId/likes", validationCardId, dislikeCard);

module.exports = router;
