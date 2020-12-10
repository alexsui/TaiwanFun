const express=require('express');
const router=express.Router({mergeParams:true});
const passport=require("passport");
const user=require("../controllers/user")

//register
router.route("/register")
  .get(user.registerForm)
  .post(user.register);
//login
router.route("/login")
  .get(user.loginForm)
  .post(passport.authenticate('local',{ failureRedirect: '/login',failureFlash:true }),user.login);

router.get('/logout',user.logout)
//GOOGLE OAUTH
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/auth/google/redirect",passport.authenticate('google',{failureRedirect:"/login"}),user.googleAuthRedirect);
module.exports=router;
