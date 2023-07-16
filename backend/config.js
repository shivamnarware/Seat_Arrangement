const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    db: {
        url: process.env.MONGO_URI, // Update with your MongoDB connection URL
    },
};
