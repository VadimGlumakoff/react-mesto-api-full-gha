const Card = require("../models/card");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");

const ForbiddenError = require("../errors/ForbiddenError");

const getCard = async (req, res, next) => {
    try {
        const cards = await Card.find({});
        res.send(cards);
    } catch (err) {
        next(err);
    }
};

const deleteCardById = async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.cardId);

        if (!card) {
            throw new NotFoundError("Карточка не найдена");
        }

        if (card.owner.toString() !== req.user._id) {
            throw new ForbiddenError("У вас нет прав");
        }
        await card.deleteOne();
        res.send({ message: "Карточка удалена" });
    } catch (err) {
        if (err.name === "CastError") {
            next(new BadRequestError("Невалидные данные"));
            return;
        }
        next(err);
    }
};

const createCard = async (req, res, next) => {
    try {
        const { name, link } = req.body;

        const card = await Card.create({ name, link, owner: req.user._id });
        if (!card) {
            throw new NotFoundError("Карточка не создана");
        }
        res.status(201).send(card);
    } catch (err) {
        if (err.name === "ValidationError") {
            next(new BadRequestError("Невалидные данные"));
            return;
        }
        next(err);
    }
};

const likeCard = async (req, res, next) => {
    try {
        const card = await Card.findByIdAndUpdate(
            req.params.cardId,
            { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        );
        if (!card) {
            throw new NotFoundError("Карточка не найдена");
        }
        res.send(card);
    } catch (err) {
        if (err.name === "CastError") {
            next(new BadRequestError("Невалидные данные"));
            return;
        }
        next(err);
    }
};

const dislikeCard = async (req, res, next) => {
    try {
        const card = await Card.findByIdAndUpdate(
            req.params.cardId,
            { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        );
        if (!card) {
            throw new NotFoundError("Карточка не найдена");
        }
        res.send(card);
    } catch (err) {
        if (err.name === "CastError") {
            next(new BadRequestError("Невалидные данные"));
            return;
        }
        next(err);
    }
};

module.exports = {
    getCard, deleteCardById, createCard, likeCard, dislikeCard,
};
