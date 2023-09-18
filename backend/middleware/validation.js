const { celebrate, Joi } = require("celebrate", "Joi");
const validUrl = require("valid-url");

const validationLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validationCreateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom((value, helper) => {
            if (!validUrl.isWebUri(value)) {
                return helper.error("Невалидный url");
            }
            return value;
        }),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validationUpdateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        about: Joi.string().min(2).max(30).required(),
    }),
});

const validationUpdateAvatar = celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().required().custom((value, helper) => {
            if (!validUrl.isWebUri(value)) {
                return helper.error("Невалидный url");
            }
            return value;
        }),
    }),
});

const validationUserId = celebrate({
    params: Joi.object().keys({
        userId: Joi.string().required().hex().length(24),
    }),
});

const validationCardId = celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().required().hex().length(24),
    }),
});

const validationCreateCard = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        link: Joi.string().required().custom((value, helper) => {
            if (!validUrl.isWebUri(value)) {
                return helper.error("Невалидный url");
            }
            return value;
        }),
    }),
});

module.exports = {
    validationCreateCard,
    validationCreateUser,
    validationLogin,
    validationUpdateAvatar,
    validationUpdateUser,
    validationUserId,
    validationCardId,
};
