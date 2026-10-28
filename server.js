// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Car = require('./models/Car')


// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()

//routes go here
app.get('/cars' , async (req,res)=>{
const allCars = await Car.find()
res.render('car-list.ejs',{cars:allCars})
})

app.get('/cars/new',(req,res)=>{
    res.render('create-car.ejs')
})

app.post('/cars', async (req,res)=>{
    req.body.isAvailable = req.body.isAvailable === 'on'
    const createdCar = await Car.create({
        name: req.body.name,
        modelYear: req.body.modelYear,
        isAvailable:req.body.isAvailable
    })
    res.redirect('/cars')
})

app.get('/cars/:carId', async (req,res)=>{
    const foundCar = await Car.findById(req.params.carId)
    res.render('car-details.ejs',{car:foundCar})
})

app.get('/cars/:carId/edit' , async (req,res)=>{
    const editedCar = await Car.findById(req.params.carId)
res.render('edit-car.ejs',{car:editedCar})
})

app.put('/cars/:carId/update', async (req,res)=>{
    req.body.isAvailable = req.body.isAvailable === 'on'
    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body)
    res.redirect('/cars')
})



app.delete('/cars/:carId/delete', async (req,res)=>{
    const deletedCar = await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
})



app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000

