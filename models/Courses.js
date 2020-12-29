const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        trim: true,
<<<<<<< HEAD
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a course description'], 
    },
    weeks: {
        type: String,
        required: [true, 'Please add number of weeks'],
    },
    tuition: {
        type: Number,
        required: [true, 'Please add a course title'],
=======
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    weeks: {
        type: String,
        required: [true, 'Please add number of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please add tuition cost']
>>>>>>> c0c4a0a629380cae016f8e45d524dfbf3cab6654
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable: {
        type: Boolean,
<<<<<<< HEAD
        required: false
=======
        default: false
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required: true
>>>>>>> c0c4a0a629380cae016f8e45d524dfbf3cab6654
    },
    createdAt: {
        type: Date,
        default: Date.now
<<<<<<< HEAD
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
=======
>>>>>>> c0c4a0a629380cae016f8e45d524dfbf3cab6654
    }
});

module.exports = mongoose.model('Courses', courseSchema);
