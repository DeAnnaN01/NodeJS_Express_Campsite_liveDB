require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');




async function main() {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
module.exports = main;
