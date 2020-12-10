const Joi =require("joi");

const articleJoiSchema=Joi.object({
    article:Joi.object({      
        title:Joi.string().required(),
        city:Joi.string().required(),
        category:Joi.string().required(),
        // image:Joi.string().required(),
        content:Joi.string().required(),
        createDate:Joi.string().required(),
        editDate:Joi.string(),
    }).required(),
   
}).options({allowUnknown: true});
const reviewJoiSchema=Joi.object({
    review:Joi.object({
        body:Joi.string().required(),
        rating:Joi.number().required().min(1),
        createDate:Joi.string().required(),
    }).required(),
}).options({allowUnknown: true});

module.exports.articleJoiSchema=articleJoiSchema;
module.exports.reviewJoiSchema=reviewJoiSchema;
