
const Article = require('../models/article');
const NotFoundError = require('../utils/classes/notFoundError');

module.exports.renderNewPage = (req, res)=>{
    res.render('articles/new', {user: req.user, article: {}});
}

module.exports.newArticle = async(req, res, next)=>{
    try{
        const article = await Article.create({
            title: req.body.title,
            description: req.body.description, 
            markdown: req.body.markdown, 
            user: req.user.id,
            docModel: req.user.provider === 'google'? 'GoogleUser': 'User'});

        res.redirect(`/articles/${article.slug}`);
    }
    catch(e){
        next(e);
    }
}


module.exports.userArticles = async(req, res, next)=>{
    try{
        const articles = await Article.find({user: req.user.id}).sort({createdAt: -1}).populate('user', 'name').exec();

        res.render('articles/index', {user: req.user, articles});
    }
    catch(e){
        next(e);
    }
}

module.exports.showArticle = async(req, res, next)=>{
    let isAuthorizedUser = false;
    try{
        const article = await Article.findOne({slug: req.params.slug}).populate('user').exec();


        if(!article){
            const err = new NotFoundError("404 not Found!")
            return next(err)
        }
        if(req.user){
            isAuthorizedUser = req.user.id === article.user.id; // for showing the menu of edit and delete to that specific user
        }
  
        res.render('articles/show', {user: req.user, showMenu: isAuthorizedUser, article});
    }
    catch(e){
        next(e);
    }
}


module.exports.renderEditPage = async(req, res, next)=>{
    try{
        const article = await Article.findById(req.params.id);

        if(!article){
            const err = new NotFoundError("404 not Found!");
            return next(err);
        }
        res.render('articles/edit', {user: req.user, article})
    }
    catch(e){
        next(e);
    }
}

module.exports.editArticle = async(req, res, next)=>{
    let article;
    try{
 
        article = await Article.findById(req.params.id);

        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;

        article = await article.save();

    
        res.redirect(`/articles/${article.slug}`)
    }
    catch(e){
        next(e);
    }
}


module.exports.deleteArticle = async(req, res, next)=>{
    try{
        await Article.findByIdAndDelete(req.params.id);

        res.redirect('/articles');
    }
    catch(e){
        next(e);
    }
}