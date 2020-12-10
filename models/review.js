const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const{reviewJoiSchema}=require('../joiSchema');
const{validateReview}=require('../middleware/validate')
const{addCreateDate}=require('../middleware/addDate');
const moment=require("moment");
moment().format();
const reviewSchema=new Schema({
    body:String,
    rating:Number, 
    createDate:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
})
//create new review
reviewSchema.pre('save', addCreateDate);
reviewSchema.post('save',validateReview)
const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;