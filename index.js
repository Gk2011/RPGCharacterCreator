const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const newChracterRoutes = require('./routes/newCharacterRoutes');
const editChracterRoutes = require('./routes/editCharacterRoutes');
const viewChracterRoutes = require('./routes/viewCharacterRoutes');

const { promisify } = require('util');
const { mongodbUri, redisClient, prewarmCache } = require('./util');
const flushAsync = promisify(redisClient.flushall).bind(redisClient);


// Models
const Character = require('./src/models/character');

const start = async () => {

    await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connection ready');

    console.log('Flushing Redis');
    await flushAsync();

    console.log('Prewarm Redis');
    await prewarmCache();

    // Set Application information
    // Set Application information
    app.engine('ejs', ejsMate)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));


    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride('_method'));
    app.use(newChracterRoutes, editChracterRoutes, viewChracterRoutes);
    
    app.get('/index', async (req, res) => {
        const characters = await Character.find({});
        res.render('characters/index', { characters });
        });

    console.log('Starting server...');
    const server = app.listen(process.env.PORT || 3000, () => {
        const port = server.address().port;
        console.log(`Listening on port ${port}! 🚀`);
        });
    };


start().catch(err => {
    console.error(err);
    process.exit(1);
  });
    




// 'mongodb://localhost:27017/5e-database'
// Mongodb connection using mongoose
// mongoose.connect(mongodbUri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// });



// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// console.log('Flushing Redis');
// flushAsync();

// console.log('Prewarm Redis');
// prewarmCache();




// // Set Application information
// app.engine('ejs', ejsMate)
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));


// Routes
// app.get('/index', async (req, res) => {
//     const characters = await Character.find({});
//     res.render('characters/index', { characters });
// });


// // Router files added
// app.use(newChracterRoutes, editChracterRoutes, viewChracterRoutes);

// app.listen(3000, () => {
// console.log("APP IS LISTENING ON PORT 3000!")