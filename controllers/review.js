const catchAsync=require("../utils/catchAsync");
const ExpressError = require('../utils/ExpressError');
const Article=require("../models/article");
const Review=require("../models/review");
const ObjectID = require('mongodb').ObjectID;

module.exports.renderNewReviewForm=catchAsync(async(req,res)=>{
    const{id}=req.params;
    if(!ObjectID.isValid(id)){
        throw new ExpressError('Invalid ID',404)
    }
    const article= await Article.findById(id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if(!article){
        throw new ExpressError('Article not found',404)
    }
    const reviews=article.reviews;
    res.render("review/newReview",{article,reviews});
})
module.exports.renderAllReviews=async(req,res)=>{
    const{id}=req.params;
    const article= await Article.findById(id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    });
    const reviews=article.reviews;
    res.render("review/allReviews",{article,reviews});
}
module.exports.createNewReview=async(req,res)=>{
    const{id}=req.params;
    const article=await Article.findById(id);
    const review= new Review(req.body.review);
    review.author=req.user._id;
    article.reviews.push(review);
    review.save();
    article.save();
    req.flash('success',"成功新增評論!");
    res.redirect(`/articles/${id}/reviews`);
}
module.exports.deleteReview=async(req,res)=>{
    const{id,reviewId}=req.params;
    await Article.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success',"成功刪除評論!");
    res.redirect(`/articles/${id}/reviews`);
}