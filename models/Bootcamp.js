const mongoose = require('mongoose');
const slugify = require('slugify');
const { Schema } = mongoose;
const geocoder = require('../utils/geocoder');

const BootcampSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a bootcamp name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Bootcamp name cannot be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description for this bootcamp'],
    maxlength: [500, 'Bootcamp name cannot be more than 50 characters'],
  },
  website: {
    type: String,
    match: [
      /^((https?|http):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Please use a valid URL with HTTP/HTTPS',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please enter phone number'],
    minlength: [10, 'Phone number cannot be less than 10 digits'],
    maxlength: [14, 'Phone number cannot be more than 14 digits'],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please use a valid email address',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add a valid address'],
    location: {
      //GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere',
      },
      formattedaddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Devops',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must not exceed 5'],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Create Bootcamp slug from the name
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Geocode Create Location field
BootcampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedaddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  //Do not save address in DB
  this.address.location = undefined;
  next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
