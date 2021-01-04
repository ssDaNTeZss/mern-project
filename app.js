const express = require('express');
const fileUpload = require('express-fileupload');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true}));

app.use(fileUpload());


app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/userData', require('./routes/userData.route'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server ERROR', e.message);
        process.exit(1);
    }
}

start();

