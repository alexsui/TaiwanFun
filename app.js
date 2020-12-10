if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const ObjectID = require('mongodb').ObjectID;
const { urlencoded } = require('express');
const express=require('express');
const app=express();
const path=require("path");
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const Article=require("./models/article");
const Review=require("./models/review");
const User=require("./models/user");
const methodOverride=require("method-override");
const ExpressError=require('./utils/ExpressError');
const catchAsync=require("./utils/catchAsync");
const {validateArticle,validateReview}=require("./middleware/validate");
const{errorHandle}=require("./middleware/errorHandle");
const{isLogin}=require("./middleware/authenticate");
const session = require('express-session');
const flash=require("connect-flash");
const bcrypt=require("bcrypt");
const allCity=require("./utils/city");
const moment=require("moment");
moment().format();
const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy

const articleRoutes=require('./routes/article')
const reviewRoutes=require('./routes/review')
const userRoutes=require('./routes/user')

//session config
const sessionConfig={
    name:"session",
    secret:"D5BD3846BCB21FCE",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000 * 60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionConfig));
app.use(flash());

//set passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy( 
    {usernameField:'email'},
  function(email, password, done) {
        // Mongoose 以帳號資訊向 MongoDB 查找這位使用者
        User.findOne({ email: email }, async function (err, user) {
        // 如果伺服器端回傳錯誤訊息，提供 passport 錯誤訊息
        if (err) { return done(err) }
        console.log(user)
        
        // 如果沒有在資料庫裡找到該位使用者，不提供 passport 任何使用者資訊
        if (!user) { return done(null, false,{message:'帳號不存在'}) }
        // 如果從資料庫找到了該名使用者，但密碼錯誤時，不提供 passport 任何使用者資訊
        const isValid=await bcrypt.compare(password,user.password);
        if (!isValid) { return done(null, false,{message:"密碼錯誤"}) }
        // 如果帳號及密碼皆正確，提供 passport 使用者資訊
        return done(null, user)
        })
    }
));
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
      },(accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
              //if we already have a record with the given profile ID
              done(null, currentUser);
            } else{
                 //if not, create a new user 
                new User({
                  googleId: profile.id,
                  name: profile.displayName,
                }).save().then((newUser) =>{
                  done(null, newUser);
                });
            }
        })
      })
  );
 
// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, done) {
    done(null, user.id)
  });
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  }
);

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.allCity=allCity;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

app.use(methodOverride('_method'))

app.use(urlencoded({extended:true}));
app.engine('ejs',engine);
app.set("views",path.join(__dirname,"views"));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

//connect MongoDB
mongoose.connect('mongodb://localhost:27017/my_website', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((res)=>{
    console.log("Successdully connect to MongoDB!!");
}).catch((error)=>{
    console.log("Cannot connect MongoDB");
})
//set routes
app.use("/articles",articleRoutes);
app.use("/articles/:id",reviewRoutes);
app.use(userRoutes);
app.get("/",(req,res)=>{
    res.render("home");
})

app.all("*",(req,res,next)=>{
    next(new ExpressError("Page Not Found!!",404));
})

app.use(errorHandle);
app.listen(3000,(req,res)=>{
    console.log("Server is listening on 3000 port");

})