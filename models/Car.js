const mongoose = require('mongoose')
const { applyTimestamps } = require('../../../lectures/unit2/fruits-crud-code-along/models/Fruit')

const carSchema = new mongoose.Schema({
    name:{
        type:String
    },
    modelYear:{
        type:Number
    },
    isAvailable:{
        type:Boolean
    }
},{timestamps:true})

const Car = mongoose.model('Car',carSchema)

module.exports = Car