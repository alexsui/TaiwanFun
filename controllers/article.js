const ObjectID = require('mongodb').ObjectID;
const catchAsync=require("../utils/catchAsync");
const ExpressError = require('../utils/ExpressError');
const Article=require("../models/article");
const{cloudinary}=require("../cloudinary/index");
const allCity=require("../utils/city")

module.exports.index=catchAsync(async(req,res)=>{
    const articles= await Article.find({});
    res.render("article/index",{articles});
})
module.exports.renderNewForm=catchAsync((req,res)=>{
    res.render("article/new");
})
module.exports.createNewArticle=catchAsync(async(req,res)=>{
    if(!req.body.article){
        throw new ExpressError('Invalid article data',500);
    }
    const article=new Article(req.body.article);
    article.images=req.files.map((f)=>{
        return {
            url:f.path,
            filename:f.filename,
        }
    })
    article.author=req.user._id;  
    await article.save();
    req.flash('success',"成功新增文章!");
    res.redirect(`/articles/category/${article.category}`);    
})
module.exports.renderShowArticle=catchAsync(async(req,res,next)=>{
   
    const{id}=req.params;
    if(!ObjectID.isValid(id)){
        throw new ExpressError('Invalid ID',404)
    }
    const article= await Article.findById(id);
    console.log(article.author)
    if(!article){
        throw new ExpressError('Article not found',404)
    }
    res.render("article/show",{article});    
})
module.exports.renderEditForm=catchAsync(async(req,res,next)=>{
    const{id}=req.params;
    if(!ObjectID.isValid(id)){
        throw new ExpressError('Invalid ID',404);
    }
    const article= await Article.findById(id);
    if(!article){
        throw new ExpressError('Article not found',404);
    }
    
    res.render("article/edit",{article});         
})
module.exports.updateArticle=catchAsync(async(req,res)=>{
    const{id}=req.params;
    const{article}=req.body;
    const updatedArticle=await Article.findByIdAndUpdate(id,article,{new:true});
    const imgs=req.files.map((f)=>{
        return {
            url:f.path,
            filename:f.filename,
        }
    })
    updatedArticle.images.push(...imgs);
    await updatedArticle.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
         }
        await updatedArticle.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}});
    }
    req.flash('success',"成功編輯文章!");
    res.redirect(`/articles/${id}`);
})
module.exports.deleteArticle=catchAsync(async(req,res)=>{
    const{id}=req.params;
    if(!ObjectID.isValid(id)){
        throw new ExpressError('Invalid ID',404)
    }
    const article= await Article.findById(id);
    if(!article){
        throw new ExpressError('Article not found',404)
    }  
    const category=article.category;
    await Article.findByIdAndDelete(id);
    req.flash('success',"成功刪除文章!");
    res.redirect(`/articles/category/${category}`);
})
module.exports.renderMyArticle=async(req,res)=>{
    const articles=await Article.find({author:req.user._id});
    res.render('article/myArticle',{articles});
}
module.exports.renderCategory=catchAsync(async(req,res)=>{
    const{category}=req.params;
    if(category!=="food"&&category!=="attraction"){
        throw new ExpressError("Category not found",404);
    }
    const articles=await Article.find({category})
    res.render("article/category",{articles,category});
})
module.exports.renderCity=async(req,res)=>{
    const{city}=req.params;
    const articles=await Article.find({city});
    res.render("article/city",{articles,city});
}
module.exports.showMap=(req,res)=>{
    res.render("map");
}