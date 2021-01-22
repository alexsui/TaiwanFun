const ObjectID = require('mongodb').ObjectID;
const catchAsync=require("../utils/catchAsync");
const ExpressError = require('../utils/ExpressError');
const Article=require("../models/article");
const{cloudinary}=require("../cloudinary/index");
const allCity=require("../utils/city")

module.exports.index=catchAsync(async(req,res)=>{
    const {q}=req.query;
    if(q){
        if(q==="myArticle"){
            const articles=await Article.find({author:req.user._id});
            return res.render('article/index',{articles});
        }else if(q==="food"||q==="attraction"){
            const category=q;
            const articles=await Article.find({category})
            return res.render("article/category",{articles,category});
        }else if(q==="city"){
            const{city}=req.query;
            const articles=await Article.find({city});
            if(!articles){
                throw new ExpressError("City not found",404);
            }
            return res.render("article/city",{articles,city});
         }else{
            throw new ExpressError("Category not found",404);
        }
    }
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
module.exports.showMap=(req,res)=>{
    res.render("map");
}