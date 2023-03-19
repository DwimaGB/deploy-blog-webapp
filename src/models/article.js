
const mongoose = require('mongoose');

const slugify = require('slugify');
const marked = require('marked').marked;
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const domPurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Types.ObjectId,
        refPath: 'docModel',
    },
    docModel: {
        type: String,
        required: true,
        enum: ['User', 'GoogleUser']
    },
    htmlContent: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    }
});

articleSchema.pre('validate', async function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
        try {
            const count = await this.constructor.countDocuments({slug: this.slug});

            if(count > 0){
                this.slug = `${this.slug}-${count+1}`;
            }
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
    if (this.markdown) {
        this.htmlContent = domPurify.sanitize(marked(this.markdown));
    }
    
    next()
});


module.exports = mongoose.model('Article', articleSchema);