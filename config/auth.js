module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash('error_msg' , 'Por favor inicia sesion para acceder');
    res.redirect('/users/login');
    }
    }