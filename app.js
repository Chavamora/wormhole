const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const expressEjsLayout = require('express-ejs-layouts');
const session = require('express-session');
var bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
var fs = require('fs');
var path = require('path');
var imgModel = require('./models/image');
var multer = require('multer');
const Materia = require("./models/materia.js");
const Meta = require("./models/meta.js");
const Hobbie = require("./models/hobbie.js");
const Deporte = require("./models/deporte.js");
const RuedaDeVida = require("./models/ruedaDeVida.js");
const RuedaDeVidaM = require("./models/ruedaDeVidaM.js");
const Blog = require("./models/blog.js");
const Pregunta = require("./models/pregunta.js");
const { Console } = require('console');





require("./config/passport")(passport)
//express app
const app = express();
//connect to mongodb
const dbURL = 'mongodb+srv://beto:test1234@nodetuts.jy1sr.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
    //register view engine
app.set('view engine', 'ejs');

//listen for requests
//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

   app.use(passport.initialize());
  app.use(passport.session());

   //use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })

app.use(morgan('dev'));


// app.get('/', (req, res) => {
//     res.redirect('index');
// });

app.get('/index', (req, res) => {
    res.render('index', {title: 'inicio'});
});

app.get('/faqs', (req, res)=>{
    const user = req.session.passport.user;
    console.log(user.name)

    Pregunta.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('preguntasSesion', {title: 'FAQS', preguntas: result, user_id: user, user: req.user,})
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/faqs/editar', (req, res)=>{
    const user = req.session.passport.user;
    console.log(user.name)

    Pregunta.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('editarPreguntas', {title: 'editar FAQS', preguntas: result, user_id: user, user: req.user})
    })
    .catch((err) => {
        console.log(err);
    })
});


app.get('/index/faq', (req, res)=>{
    Pregunta.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('preguntas', {title: 'FAQS', preguntas: result})
    })
    .catch((err) => {
        console.log(err);
    })
});

// app.get('/preguntas/borrar/:id', (req, res)=>{
//    id = req.params.id

//    Pregunta.findByIdAndDelete(id)
//    .then(result => {
//        res.json({redirect: '/faqs/editar'})
//    })
//    .catch(err => {
//        console.log(err)
//    })
// });

app.delete('/preguntas/borrar/:id', (req, res) => {
    const id = req.params.id;

    Pregunta.findByIdAndDelete(id)
   .then(result => {
  res.json({redirect: '/faqs/editar'})
    
   })
   .catch(err => {
       console.log(err)
   })
});

app.get('/preguntas/modificar/:id', (req, res)=>{
   const id = req.params.id;

   Pregunta.findById(id)
   .then(result => {

    res.render('modificarPregunta', {title: 'modificar pregunta', pregunta: result, id });
    console.log(result)
   })
   .catch(err => {
       console.log(err)
   })
});

app.post('/preguntas/modificar/:id', (req, res)=>{
    const id = req.params.id;
 
    console.log(req.body);
    Pregunta.findByIdAndUpdate(

        {_id: id}, 
        {titulo: req.body.titulo,
        respuesta: req.body.respuesta},
        
        
        function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/faqs/editar');
            }
        }
    )
    .catch(err => {
        console.log(err)
    })
 });

app.post('/faqs', (req, res)=> {
    const user = req.session.passport.user;
    const pregunta = new Pregunta(req.body);

    pregunta['user_id'] = user;
    console.log(pregunta);
    console.log(req.body);

    pregunta.save()
    .then((result) => {
        res.redirect('/faqs/editar');
    })
    .catch((err) => {
        console.log(err);
    })

});



app.get('/estudio', (req, res) => {
    const user = req.session.passport.user;
    console.log(user.name)

    Materia.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('estudio', {title: 'tus materias', materias: result, user_id: user })
    })
    .catch((err) => {
        console.log(err);
    })

});

app.get('/estudio/nueva-materia', (req, res) => {
    res.render('agregarMateria', {title: 'agregar materia'});
});

app.post('/estudio', (req, res) => {
    console.log(req.body);
    const materia = new Materia(req.body);
    const user = req.session.passport.user;
materia['user_id'] = user;
console.log(materia);

    materia.save()
        .then((result) => {
            res.redirect('/estudio');
        })
        .catch((err) => {
            console.log(err);
        })
});




app.get('/planDeVida', (req, res) => {
    const user = req.session.passport.user;

    Meta.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('planDeVida', {title: 'tus metas', metas: result, user_id: user })
    })
    .catch((err) => {
        console.log(err); 
    })

});

app.get('/planDeVida/agregarMeta', (req, res) => {
    res.render('agregarMeta', {title: 'agregar meta'});
});

app.post('/planDeVida', (req, res) => {
    console.log(req.body);
    const meta = new Meta(req.body);
    const user = req.session.passport.user;
    meta['user_id'] = user;
    console.log(meta);

    meta.save()
        .then((result) => {
            res.redirect('/planDeVida');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/hobbies', (req, res) => {

    const user = req.session.passport.user;
    console.log(user)

    Hobbie.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('hobbies', {title: 'tus hobbies', hobbies: result, user_id: user })
    })
    .catch((err) => {
        console.log(err);
    })

});

app.get('/hobbies/agregarHobbie', (req, res) => {
    const user = req.session.passport.user;
    res.render('agregarHobbie', {title: 'agregar hobbie', user_id: user});
});

app.post('/hobbies', (req, res) => {
    console.log(req.body);
    const hobbie = new Hobbie(req.body);
    const user = req.session.passport.user;
    hobbie['user_id'] = user;
    console.log(hobbie);

    hobbie.save()
        .then((result) => {
            res.redirect('/hobbies');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/deporte', (req, res) => {
    const user = req.session.passport.user;
    Deporte.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('deporte', {title: 'tus deportes', deportes: result, user_id: user })
    })
    .catch((err) => {
        console.log(err);
    })

});

app.get('/deporte/agregarDeporte', (req, res) => {
    res.render('agregarDeporte', {title: 'agregar deporte'});
});

app.post('/deporte', (req, res) => {
    console.log(req.body);
    const deporte = new Deporte(req.body);
    const user = req.session.passport.user;
    deporte['user_id'] = user;
    console.log(deporte);

    deporte.save()
        .then((result) => {
            res.redirect('/deporte');
        })
        .catch((err) => {
            console.log(err);
        })
});

// app.get('/ruedaDeVida', (req, res) => {
//     res.render('ruedaDeVida', {title: 'rueda de vida'});
// });

app.get('/ruedaDeVida', (req, res) => {
    const user = req.session.passport.user;

    


    (RuedaDeVida).find().sort({ createdAt: -1})
    .then((result) => {

        if(RuedaDeVidaM) {
        (RuedaDeVidaM).find().sort({ createdAt: -1})
        .then((resu) => {
        console.log(resu)
        const RuedaDeVidaMRes = resu
        res.render('ruedaDeVida', {title: 'tu ruedaDeVida', ruedaDeVida: result[0], ruedaDeVidaM: RuedaDeVidaMRes[0],user_id: user })
        })
    } else {
    res.render('ruedaDeVida', {title: 'tu ruedaDeVida', ruedaDeVida: result[0],user_id: user })

    }

        console.log(result)
        console.log(result[0][0])
        console.log(result[0])
    })
    .catch((err) => {
        console.log(err);
    })

});

app.get('/ruedaDeVida/editar', (req, res) => {
    res.render('editarRuedaDeVida', {title: 'editar rueda de vida'});
});

app.get('/ruedaDeVida/editarMeta', (req, res) => {
    res.render('editarRuedaDeVidaM', {title: 'editar rueda de vida'});
});

app.post('/ruedaDeVidaMetas', (req, res) => {
    console.log(req.body);
    const ruedaDeVidaM = new RuedaDeVidaM(req.body);
    const user = req.session.passport.user;
    ruedaDeVidaM['user_id'] = user;
    console.log(ruedaDeVidaM);

    ruedaDeVidaM.save()
        .then((result) => {
            res.redirect('/ruedaDeVida');
        })
        .catch((err) => {
            console.log(err);
        })
    });

app.post('/ruedaDeVida', (req, res) => {
    console.log(req.body);
    const ruedaDeVida = new RuedaDeVida(req.body);
    const user = req.session.passport.user;
    ruedaDeVida['user_id'] = user;
    console.log(ruedaDeVida);

    ruedaDeVida.save()
        .then((result) => {
            res.redirect('/ruedaDeVida');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/agenda', (req, res) => {
    res.render('agenda', {title: 'agenda'});
});

app.get('/emprendimiento', (req, res) => {
    res.render('emprendimiento', {title: 'emprendimiento'});
});

// app.get('/perfil', (req, res) => {
//     res.render('perfil', {title: 'perfil});
// });
app.get('/agenda', (req, res) => {
    res.render('agenda', {title: 'agenda'});
});

app.get('/blogs', (req, res) => {
    const user = req.session.passport.user;
    Blog.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('blogs', {title: 'tus publicaciones', blogs: result, user_id: user })
    })
    .catch((err) => {
        console.log(err);
    })

});

app.get('/blogs/agregar-blog', (req, res) => {
    res.render('agregarBlog', {title: 'nueva publicacion'});
});

app.post('/blogs', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    const user = req.session.passport.user;
blog['user_id'] = user;
console.log(blog);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
});

// app.get('/search', (req, res) => {
//     console.log(req.params.search)

// });

// app.post('/search', (req,res) => {
//     console.log(req.params.search)
// });

// app.use('/search:id') {
//     // const id = req.params.id;
//     // Blog.findById(id)
//     //     .then((result) => {
//     //         res.render('details', {blog: result, title: 'Blog Details'});
//     //     })
//     //     .catch((err) => {
//     //         res.render('404', {title: 'Blog not found'});
//     //     })
// }


app.use('/user', userRoutes);

app.use(expressEjsLayout);
//BodyParser

//Routes
app.use('/',require('./routes/index'));

app.use('/users',require('./routes/users'));

//app.use('/blogs', blogRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});