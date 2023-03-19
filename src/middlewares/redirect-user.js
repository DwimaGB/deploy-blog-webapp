

const redirectUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/articles');
    }
    next()
}

module.exports = {redirectUser};