
module.exports.errorHandle=(err,req,res,next)=>{
    const{status=500}=err;
    if(!err.message){
        err.message="Something went wrong!!";
    }
    res.status(status).render("error",{err});
}
// module.exports.formError=(err,req,res,next)=>{
//     const{status}=err;
//     if(!err.message){
//         err.message="Something went wrong!!";
//     }
//    if(err.status===400){
//        if(req.route.path==="/articles"){
//         res.status(400).render("article/new",{err});
//        }else{
//         res.status(400).render("article/edit",{err});
//        }  
//    }
//    next(err);
// }