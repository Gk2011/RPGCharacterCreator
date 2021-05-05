const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const newChracterRoutes = require('./routes/newCharacterRoutes');
const editChracterRoutes = require('./routes/editCharacterRoutes');
const viewChracterRoutes = require('./routes/viewCharacterRoutes');

// Models
const Character = require('./models/character');


// Mongodb connection using mongoose
mongoose.connect('mongodb://localhost:27017/5e-database', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


// Set Application information
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Routes
app.get('/index', async (req, res) => {
    const characters = await Character.find({});
    res.render('characters/index', { characters });
});


// Router files added
app.use(newChracterRoutes, editChracterRoutes, viewChracterRoutes);

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!")
});