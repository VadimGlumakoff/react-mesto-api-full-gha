require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const corsHandler = require("./middleware/corsHandler");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const { PORT } = require("./config");

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(corsHandler);
app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
