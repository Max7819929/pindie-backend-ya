const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/pindie';

async function connectToDatabase() {
    try {
        console.log(456);
        await mongoose.connect(DB_URL);
        console.log('Успешно подключились к MongoDB')
    }
    catch (err) {
        console.log('При подключении MongoDB возникла ошибка')
        console.error(err);
    }
}

module.exports = connectToDatabase;
