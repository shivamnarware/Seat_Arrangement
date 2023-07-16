// reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    seatNumbers: [Number],
});

module.exports = mongoose.model('Reservation', reservationSchema);
