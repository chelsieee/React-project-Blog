const mongoose = require("mongoose");

const BlogModel = new mongoose.Schema ({
    title: { type:String, required: true,},
    content:{ type:String, required: true,},
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
        },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
        }
    },
    {
    timestamps: true
    }
)

module.exports = mongoose.model('Blog', BlogModel);