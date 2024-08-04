const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
    NAME: String,
    TYPE: String,
    ASSETS: Array,
    DATAS: Object,
    CHART_DATA: Object
})

module.exports = mongoose.model('Portfolio', portfolioSchema, 'Portfolio');
