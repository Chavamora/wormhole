const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router  = express.Router();
const User = require("../models/user.js");

//login page
router.get('/', (req,res)=>{
    res.render('index', {title: 'Inicio'});
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/users/perfil',ensureAuthenticated,(req,res)=>{
    res.render('perfil',{
        user: req.user,
        title: 'perfil'
        });
    })

module.exports = router; 