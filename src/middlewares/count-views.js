
module.exports.countViews = (req, res, next)=>{
    if(req.session.views){
        req.session.views++;
    }
    else{
        req.session.views = 1;
    }
    next();
}

