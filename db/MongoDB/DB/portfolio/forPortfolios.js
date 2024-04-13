const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
    NAME : String,
    TYPE : String,
    ASSETS : Object
})

module.exports = mongoose.model('Portfolio', portfolioSchema, 'Portfolio');
