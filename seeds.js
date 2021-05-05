const mongoose = require('mongoose');
const Character = require('./models/character');
const Race = require('./models/race');

// Mongodb connection using mongoose
mongoose.connect('mongodb://localhost:27017/5e-database', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedCharacters = [
    {
        name: 'Grog',
        race: 'Tiefling',
        class: 'Barbarian',
        subclass: 'extra Barb',
        level: 5,
        abilityScores: [10, 10, 10, 10, 10, 10]
    },
    {
        name: 'Jester',
        class: 'Warlock',
        race: 'Tiefling',
        subclass: 'extra Warlock',
        level: 5,
        abilityScores: [10, 10, 10, 10, 10, 10]
    }
]

seedRaces = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 
            'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling'];

const seedDB = async() => {
    await Character.deleteMany({});
    await Race.deleteMany({});
    for(var i = 0; i < seedCharacters.length; i++){
        const playerChar = new Character({
            name: seedCharacters[i].name,
            class: seedCharacters[i].class,
            race: seedCharacters[i].race,
            subclass: seedCharacters[i].subclass,
            level: seedCharacters[i].level,
            abilityScores: seedCharacters[i].abilityScores
        });
        await playerChar.save();
    }

    for(var i = 0; i < seedRaces.length; i++){
        const newRace = new Race({
            name: seedRaces[i]
        });
        await newRace.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
