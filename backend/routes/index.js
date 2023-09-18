const express = require("express");
const { validationLogin, validationCreateUser } = require("../middleware/validation");
const { createUser, login } = require("../controlers/users");
const { auth } = require("../middleware/auth");

const router = express.Router();
const userRouter = require("./users");
const cardRouter = require("./cards");
const NotFoundError = require("../errors/NotFoundError");
const { requestLogger, errorLogger } = require("../middleware/logger");

router.use(requestLogger);
router.get("/crash-test", () => {
    setTimeout(() => {
        throw new Error("Сервер сейчас упадёт");
    }, 0);
});
router.post("/signin", validationLogin, login);
router.post("/signup", validationCreateUser, createUser);
router.use(auth);
router.use(userRouter);
router.use(cardRouter);

router.use(errorLogger);
router.use((req, res, next) => {
    next(new NotFoundError("Такой страницы не существует"));
});
module.exports = router;
