const mongoose=require('mongoose');
const Review = require('./review');
const Schema=mongoose.Schema;
const {articleJoiSchema}=require("../joiSchema");
const ExpressError=require("../utils/ExpressError");
const moment=require("moment");
const {validateArticle}=require("../middleware/validate")
const{addCreateDate,addEditDate}=require('../middleware/addDate');
const { string } = require('joi');
moment().format();

const imageSchema=new Schema({
        url:String,
        filename:String,
});
const articleSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        enum:["TPQ","KEE","TPE","TAO","HSQ","HSZ","MIA","TXG","CHA"
    ,"NAN","YUN","CYQ","CYI","TNN","KHH","PIF","TTT","HUA","ILA","JME","PEN"],
        required:true,
    },
    category:{
        type:String,
        enum:["attraction","food"],
        required:true
    },
    images:[
        imageSchema
    ],
    content:{
        type:String,
        required:true,
    },
    createDate:{
        type:String,
    },
    editDate:{
        type:String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_150,h_150');
})

//delete article
articleSchema.post("findOneAndDelete",async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})
//create article
articleSchema.pre('save', addCreateDate);
articleSchema.post('save',validateArticle);
//update article
articleSchema.pre('findOneAndUpdate', addEditDate);
articleSchema.post('findOneAndUpdate',validateArticle);
module.exports=mongoose.model('Article',articleSchema);