const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ConflictError = require("../errors/ConflictError");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const AuthError = require("../errors/AuthError");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new NotFoundError("Пользователь не найден");
        }
        res.send(user);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new NotFoundError("Пользователь не найден");
        }
        res.send(user);
    } catch (err) {
        if (err.name === "CastError") {
            next(new BadRequestError("Невалидные данные"));
            return;
        }
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const {
            name, about, avatar, email,
            password,
        } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, about, avatar, password: hashPassword, email,
        });

        res.status(201).send({
            name: user.name, about: user.about, avatar: user.avatar, email,
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            next(new BadRequestError("Невалидные данные"));
        } else

        if (err.code === 11000) {
            next(new ConflictError("Пользователь с таким email уже существует"));
        }
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { name, about } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, about },
            { new: true, runValidators: true },
        );

        if (!user) {
            throw new NotFoundError("Профиль не обновлен");
        }
        res.send(user);
    } catch (err) {
        next(err);
    }
};

const updateAvatar = async (req, res, next) => {
    try {
        const { avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar },
            { new: true, runValidators: true },
        );

        if (!user) {
            throw new NotFoundError("Профиль не обновлен");
        }
        res.send(user);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new AuthError("Пользователь не найден");
        }
        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AuthError("Введен неверный пароль");
        }
        const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "some-secret-key",
            { expiresIn: "7d" },
        );

        const cookieOption = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        };

        res.cookie("jwtToken", token, cookieOption);
        res.send({ message: "Успешно вошли" });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwtToken").send({ message: "Успешно вышли" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUsers, getUserById, createUser, updateUser, updateAvatar, login, getUser, logout,
};
