const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model('Courses', courseSchema);
