
const Article = require('../models/article');
const User = require('../models/user');
const NotFoundError = require('../utils/classes/notFoundError');

module.exports.userArticles = async(req, res, next)=>{
    let articles;
    try{
        articles =  await Article.find().sort({createdAt: -1}).populate('user').exec();


        articles = articles.filter(article=>article.user.username === req.params.user);
       

        if(articles.length ===  0){
            const err = new NotFoundError('404 Not Found!');
            return next(err);
        }

        res.render('user', {user: req.user, articles});
    }
    catch(e){
        console.log(e);
        next(e);
    }
}