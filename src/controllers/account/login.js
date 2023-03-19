
module.exports.renderPage = (req, res)=>{
    res.render('account/login');
}

module.exports.redirectHome = (req, res)=>{
    res.redirect('/');
}