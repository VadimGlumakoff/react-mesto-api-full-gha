const mongoose = require("mongoose");
const isUrl = require("validator/lib/isURL");

const cardSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: (v) => isUrl(v),
            message: "Неправильный url адрес",
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("card", cardSchema);
