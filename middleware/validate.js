const {articleJoiSchema,reviewJoiSchema}=require("../joiSchema");
const ExpressError=require("../utils/ExpressError");

module.exports.validateArticle=function(doc,next){
    const{error}=articleJoiSchema.validate({article:doc});
    if(error){
        // const message=error.details.map((e)=>e.message).join(",");
        const message=error.details[0].message;
        console.log(error);  
        throw new ExpressError(message,400);//use flash later
    }else{
        next();
    }
}
module.exports.validateReview=function(next){
    const{error}=reviewJoiSchema.validate(req.body);
    if(error){
        // const message=error.details.map((e)=>e.message).join(",");
        const message=error.details[0].message;
        console.log(error);  
        throw new ExpressError(message,400);//use flash later
    }else{
        next();
    }
}