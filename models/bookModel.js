const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const book = mongoose.model("Book", bookSchema);

module.exports = book;