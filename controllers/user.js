const ExpressError = require('../utils/ExpressError');
const User=require("../models/user")
const bcrypt=require("bcrypt");

module.exports.registerForm=(req,res)=>{
    res.render('user/register');
}
module.exports.register=async(req,res)=>{
    try{
        
        const{email,password,checkPassword,name}=req.body;
        if(email===""||password===""||checkPassword===""||name===""){
            throw new ExpressError('請輸入完整資料',400);
        }
        const isEmailExist=await User.findOne({email});
        //確認是否有重複帳號
        if(isEmailExist){
           throw new ExpressError('帳號已存在',400);
        }
        //確認是否有重複暱稱
        const isNameExist=await User.findOne({name});
        if(isNameExist){
            throw new ExpressError('暱稱已經有人使用',400);
         }
        //確認密碼是否一致
        if(!(checkPassword===password)){
            throw new ExpressError('密碼不一致',400);
        }
        const hash=await bcrypt.hash(password,12);
        const newUser=new User({
            email,
            password:hash,
            name
        })
        await newUser.save();
        req.login(newUser,(err)=>{
            if(err) return next(err);
            req.flash('success','成功註冊帳號!');
            res.redirect("/articles");
        })
    }catch(e){
        req.flash('error',e.message);
        res.redirect("/register");
    }
    
}
module.exports.loginForm=(req,res)=>{
    res.render("user/login");
}
module.exports.login=(req,res)=>{
    req.flash('success',"登入成功");
    const redirectUrl=req.session.returnTo||'/articles';
    res.redirect(redirectUrl);
}
module.exports.logout=(req,res)=>{
    req.logOut();
    req.flash('success','成功登出');
    res.redirect('/articles');
}
module.exports.googleAuthRedirect=(req,res)=>{
    req.flash('success',"成功登入");
    res.redirect('/articles');
}