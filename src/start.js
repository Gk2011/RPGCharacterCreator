const mongoose = require('mongoose');
const { promisify } = require('util');
const { mongodbUri, redisClient, prewarmCache } = require('./util');
const flushAsync = promisify(redisClient.flushall).bind(redisClient);

const createApp = require('./server');


// Models
const start = async () => {
    await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Datebase connection ready');

    console.log('Flushing Redis');
    await flushAsync();

    //console.log('Prewarm Redis');
    //await prewarmCashe();

    console.log('Setting up Express server');
    const app = await createApp();

    console.log('Starting server...');
    const server = app.listen(process.env.PORT || 3000, () => {
        const port = server.address().port;
        console.log(`Listening on port ${port}!`);
    });
};

start().catch(err => {
    console.error(err);
    process.exit(1);
});