const mongoose = require('mongoose');
const schemas = mongoose.Schema;

const blogModel = new schemas({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Blog = mongoose.model('blog', blogModel);
module.exports = Blog;
