// const express = require('express');
// const router = express.Router();
// const blogController = require('../controllers/userController');

//blog routes
// router.get('/', userController.blog_index);
// router.post('/', userController.blog_create_post);
// router.get('/create', userController.blog_create_get);
// router.get('/:id', userController.blog_details);
// router.delete('/:id', userController.blog_delete);

// module.exports = router;

const express = require('express');
const User = require("../models/user.js");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
var fs = require('fs');
var path = require('path');
var imgModel = require('../models/image');
var multer = require('multer');
const Materia = require("../models/materia.js");
const Meta = require("../models/meta.js");
const Hobbie = require("../models/hobbie.js");
const Deporte = require("../models/deporte.js");
const RuedaDeVida = require("../models/ruedaDeVida.js");
const RuedaDeVidaM = require("../models/ruedaDeVidaM.js");
const Blog = require("../models/blog.js");





//login handle
router.get('/login',(req,res)=>{
    res.render('login', {title:'login'} );
})
router.get('/register',(req,res)=>{
    res.render('register', {title: 'register'})
    })
//Register handle
router.post('/register',(req,res)=>{

    const {name,email, password, password2} = req.body;
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
        errors.push({msg : "Por favor llena todos los campos"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "Las contraseñas no coinciden"});
    }
    
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'Tu contraseña debe contener al menos 6 caracteres'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2,
        title: 'register'})
    } else {
        //validation passed
       User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'este email ya está registrado'});
            res.render('register',{errors,name,email,password,password2, title: 'register'})
            
           } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });

               //hash password
               bcrypt.genSalt(10,(err,salt)=> 
               bcrypt.hash(newUser.password,salt,
                   (err,hash)=> {
                       if(err) throw err;
                           //save pass to hash
                           newUser.password = hash;
                       //save user
                       newUser.save()
                       .then((value)=>{
                           console.log(value)
                           req.flash('success_msg','tu registro fue exitoso!')
                       res.redirect('/users/login');
                       })
                       .catch(value=> console.log(value));
                         
                   }));
                } //ELSE statement ends here
        })
    }
});


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });




router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/users/perfil',
        failureRedirect : '/users/login',
        failureFlash : true,
        })(req,res,next);

 
    });


//Retriving the image



// Uploading the image

// imgModel.find({}, (err, items) => {
    //          if (err) {
    //              console.log(err);
    //          }
    //    else {

router.get('/perfil', (req, res) => {
    console.log('buenas');
    const user = req.session.passport.user;
            imgModel.find().sort({ createdAt: -1})
    .then((result) => {
        console.log(items);
        res.render('perfil', {title: 'perfil', items: result, user_id: user })
        console.log(items);
    })
    .catch((err) => {
        console.log(err);
    })
});



router.post('/perfil/subirImagen', upload.single('image'), (req, res, next) => {
    const user = req.session.passport.user;
    var obj = {
        
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }, 
        user_id: user._id
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/perfil');
        }
    });
});

router.post('/search', (req,res) => {
    console.log(req.body.search)
    const busqueda = req.body.search;
    const user = req.session.passport.user;
    console.log(user)

    User.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('busqueda', {title: 'resultados', users: result, user_id: user, busqueda})
    })
    .catch((err) => {
        console.log(err);
    })
    
   });


//logout
router.get('/logout',(req,res)=>{
    req.logout();
req.flash('success_msg','tu sesión se ha cerrado');
res.redirect('/users/login');
 });

router.use('/:id', (req, res) => {
    
    const id = req.params.id;
    User.findById(id)
        .then((result) => {
            Materia.find().sort({ createdAt: -1})
            .then((resultMaterias) => {
                Deporte.find().sort({ createdAt: -1})
            .then((resultDeportes) => {
                Hobbie.find().sort({ createdAt: -1})
            .then((resultHobbies) => {   
                Meta.find().sort({ createdAt: -1})
            .then((resultMetas) => {  
                Blog.find().sort({ createdAt: -1})
                .then((resultBlogs) => {  
                    res.render('details', {title: 'perfil de: ' + result.name ,  materias: resultMaterias, deportes: resultDeportes, hobbies: resultHobbies, metas: resultMetas, blogs: resultBlogs, user: result })
        })    
    })
    })   
        })
    })
    //res.render('details', {title: 'tus materias', materias: resultMaterias, user: result })//res.render('details', {user: result, title: 'User Details'});
        })
        .catch((err) => {
            res.render('404', {title: 'user not found'});
        })
});



module.exports  = router;