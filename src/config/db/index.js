const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/node_express_dev');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Fail to connect');
    }
}

module.exports = { connect };
