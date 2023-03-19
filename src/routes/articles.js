
const express = require('express');
const router = express.Router();

const {isAuthorized} = require('../middlewares/auth-middlewares');

const article = require('../controllers/articles');

router.get('/', isAuthorized, article.userArticles);  

router.get('/new', isAuthorized, article.renderNewPage)
    
router.post('/', isAuthorized, article.newArticle);

router.get('/:slug', article.showArticle); // view other articles without logged in

router.get('/:id/edit', article.renderEditPage);

router.patch('/:id', article.editArticle);

router.delete('/:id', article.deleteArticle);

module.exports = router;