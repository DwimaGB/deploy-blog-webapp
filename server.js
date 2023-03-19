
require('dotenv').config();


const path = require('path');
const express = require('express');
const app = express();
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');


const passport = require('./src/config/passport-config');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const exressLayout = require('express-ejs-layouts');

const errorHandler = require('./src/middlewares/error-handlers');

const mongoose = require('mongoose');
const helmet = require('helmet');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (e)=>console.log(e));
db.once('open', ()=>{
    console.log("Connected to db");
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');


app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["self"],
        scriptSrc: ["self", "https://cdn.jsdelivr.net", "https://127.0.0.1:3000/scripts/script.js"],
    }
    
}))

app.use(methodOverride('_method'));
app.use(exressLayout);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 1000*60*60*24
    },
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL, collectionName: 'sessions'})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./src/routes/index'));
app.use('/signup', require('./src/routes/account/signup'));
app.use('/auth/login', require('./src/routes/account/login'));
app.use('/auth/google', require('./src/routes/account/google'));
app.use('/logout', require('./src/routes/account/logout'));

app.use('/user', require('./src/routes/user'));
app.use('/articles', require('./src/routes/articles'));

app.use((req, res) => {
    res.status(404).render('404', {user: req.user});
});

app.use(errorHandler);


app.listen(process.env.PORT || 3000);