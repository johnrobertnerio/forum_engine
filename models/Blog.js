const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');

//initialize slug
mongoose.plugin(slug);
const blogSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  reason: {
    type: String,
  },
  confirm: {
    type: String,
  },
  
  
  snippet: {
    type: String,
  },
  img: {
    type: String,
    default: 'placeholder.jpg',
  },
  slug: { type: String, slug: 'fname', unique: true, slug_padding_size: 2 },
   
},
{timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);
