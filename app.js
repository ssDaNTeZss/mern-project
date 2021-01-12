const express = require('express');
const fileUpload = require('express-fileupload');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true}));

app.use(fileUpload());


app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/userData', require('./routes/userData.route'));
app.use('/api/directions', require('./routes/directions.route'));
app.use('/api/upload', require('./routes/file.route'));
app.use('/api/statement', require('./routes/userStatement.route'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

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

