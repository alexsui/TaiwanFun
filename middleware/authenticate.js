module.exports.isLogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash('error',"你必須先登入");
        res.redirect('/login');
    }
    next();
}