const express = require('express');
const Joi = require('@hapi/joi');
const bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');

//Global variables declaration
let User = require('../models/users');
User = User.users;
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


const { validateBody } = require('../middlewares/route');

app.post('/users',validateBody(Joi.object().keys({
    firstName: Joi.string().required().description('Users first name'),
    lastName: Joi.string().required().description('Users last name'),
    age: Joi.number().integer().required().description('Users age'),
    profession: Joi.string().default('unemployed'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      let user = new User({
        firstName:req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    profession:req.body.profession
      });
      await user.save();
     // let result = await user.find({})
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

app.get('/users',async (req,res)=>{
  const User = mongoose.model('users', 'users');
  const name = req.query.name;
  let result;
  if(name){
    console.log('hi')
    result=  await User.find({'firstName':req.query.name});
  }else{
    result=  await User.find();
  }  
  res.status(200).json(result)
})

app.put('/users',async (req,res)=>{
  const User = mongoose.model('users', 'users');
  const filter = { firstName: req.body.firstName };  
  let result;      
    result=  await User.findOneAndUpdate(filter, req.body, {
      new: true
    });
    console.log('resu'+  JSON.stringify(result))
  res.status(200).json(result)
})



module.exports = app;