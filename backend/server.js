const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const CarModel = require("./models/CarModel");

const app = express();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${process.env.PORT}`);
    mongoose.connect(process.env.db_connection).then(() => {
        console.log(" Database connected");
    });
}); 

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}));



app.get('/',(req,res)=>{
    CarModel.find({}).then((cars)=>{
        res.render('home.ejs', {todos: cars});
    });
    
})

app.post('/cars',(req,res)=>{

    const newTodo = new CarModel ({
        car: req.body.car
    }); 

    newTodo.save().then(()=>{
        res.redirect('/')
    })
    .catch(err =>{
        console.error(err);
        res.status(500).send('Error saving new car')
    });
})


app.post('/cars/:id/update', (req,res)=>{
    CarModel.findByIdAndUpdate(req.params.id).then((todo)=>{
        todo.car = req.body.car
        todo.save();
        res.redirect('/');
    })
})


app.post('cars/:id/complete',(req,res)=>{
    CarModel.findById(req.params.id).then((todo)=>{
        todo.is_completed = !todo.is_completed
        todo.save();
        res.redirect('/')
    })
})

app.post('cars/:id/delete',(req,res)=>{
    CarModel.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect('/')
    })
})


module.exports= mongoose;