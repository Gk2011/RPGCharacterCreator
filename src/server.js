const express = require('express');

const path = require('path');

const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const newChracterRoutes = require('./routes/newCharacterRoutes');
const editChracterRoutes = require('./routes/editCharacterRoutes');
const viewChracterRoutes = require('./routes/viewCharacterRoutes');


// Models
const Character = require('./models/character');
const { server_info } = require('./util/RedisClient');
//comments
const createApp = async () => {
    const app = express();

    // application settings
    app.engine('ejs', ejsMate)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride('_method'));
    app.use(newChracterRoutes, editChracterRoutes, viewChracterRoutes);
    app.use(express.static(__dirname + '/public'));


    // Home Route



    app.get('/index', async (req, res) => {
        const characters = await Character.find({});
        res.render('characters/index', { characters });
        });
        return app
    };

module.exports = createApp;