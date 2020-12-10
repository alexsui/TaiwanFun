const express=require('express');
const router=express.Router({mergeParams:true});
const{isLogin}=require("../middleware/authenticate");
const review=require("../controllers/review")
router.route("/reviews")
    .get(isLogin,review.renderNewReviewForm)//New review form
    .post(isLogin,review.createNewReview)//create new review

//show all reviews
router.get("/allReviews",review.renderAllReviews)
//delete review
router.delete("/reviews/:reviewId",review.deleteReview)
module.exports=router;