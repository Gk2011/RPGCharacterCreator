if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();

}
//const redis = require('redis')
const express = require('express');
const session = require('express-session')
const flash = require('connect-flash');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const catchAsync = require('./util/catchAsync');

//routes
const newChracterRoutes = require('./routes/newCharacterRoutes');
const editChracterRoutes = require('./routes/editCharacterRoutes');
const viewChracterRoutes = require('./routes/viewCharacterRoutes');
const viewAllCharacterRoutes = require('./routes/viewAllCharacters');
const userRoutes = require('./routes/users');

const { redisClient } = require('./util');
let RedisStore = require('connect-redis')(session);

// Models
const { server_info } = require('./util/RedisClient');
const ExpressError = require('./util/ExpressError');



const createApp = async () => {
    const app = express();

    // application settings
    app.engine('ejs', ejsMate)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride('_method'));

    // Session Configuration settings

    app.use(
        session({
          store: new RedisStore({ client: redisClient }),
          saveUninitialized: false,
          secret: 'keyboard cat',
          resave: false,
          cookie: {
                    httpOnly: true,
                    expires: Date.now() +  1000 * 60 * 60 * 24 * 7,
                    maxAge: 1000 * 60 * 60 * 24 * 7
                }
        })
      )

    app.use(flash());



    //Authentication
    const passport = require('passport');
    const LocalStrategy = require('passport-local');
    const User = require('./models/user');

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Adds user information for templates + error/success hooks
    app.use((req, res, next) => {
        res.locals.currentUser = req.user;
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    });

    // Add Routes
    app.use(
        newChracterRoutes, 
        editChracterRoutes, 
        viewChracterRoutes,
        userRoutes,
        viewAllCharacterRoutes
        );

    // Serve Public files
    app.use(express.static(__dirname + '/public'));


    //Home Route && Error route
    app.get('/', catchAsync(async (req, res) => {
        
        res.render('characters/index');
        }));

    app.get('/index', catchAsync(async (req, res) => {
        
        res.render('characters/index');
        }));

    app.all('*', (req, res, next) => {
            next(new ExpressError('Page Not Found', 404));
        });

    app.use((err, req, res, next) => {
        const { statusCode = 500, message = "Something went wrong" } = err;
        if(!err.message) err.message = 'Oh No, Something went Wrong!'
        res.status(statusCode).render('error', { err });
    });

        return app
    };








module.exports = createApp;