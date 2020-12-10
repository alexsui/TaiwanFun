const moment=require("moment");
moment().format();
module.exports.addCreateDate=function(next){
    const time=moment().format('YYYY-MM-DD hh:mm a');
    this.set({ createDate: time});
    next();
}
module.exports.addEditDate=function(next){
    const time=moment().format('YYYY-MM-DD hh:mm a');
    this.set({ editDate: time});
    next();
}