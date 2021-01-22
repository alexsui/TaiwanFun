const express=require('express');
const router=express.Router();
const ObjectID = require('mongodb').ObjectID;
const catchAsync=require("../utils/catchAsync");
const ExpressError = require('../utils/ExpressError');
const Article=require("../models/article");
const{isLogin}=require("../middleware/authenticate");
const article=require("../controllers/article")
const multer=require("multer");
const{storage}=require("../cloudinary/index");
const upload = multer({storage});
const allCity=require("../utils/city")

router.route("/")
    .get(article.index)// all articles,myarticles,category,city
    .post(isLogin,upload.array('images'),article.createNewArticle);//create new article
//new article form
router.get("/new",isLogin,article.renderNewForm);
//show map
router.get("/map",article.showMap);

router.route("/:id")
    .get(article.renderShowArticle)//查看完整內容
    .put(upload.array('images'),article.updateArticle)//update article
    .delete(isLogin,article.deleteArticle)//delete article
router.get("/:id/edit",isLogin,article.renderEditForm)//edit article
module.exports=router;