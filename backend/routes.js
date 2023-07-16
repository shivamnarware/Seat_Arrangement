const express = require('express');
const Reservation = require('./reservation');
const router = express.Router();

router.post('/reserve', async (req, res) => {
    try {
        const { username, seating } = req.body;
        let seatNumbers = seating
        const reservation = new Reservation({
            username,
            seatNumbers,
        });
        // console.log(reservation)
        await reservation.save();
        res.status(201).json({ message: 'Seats reserved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error or duplicate value added' });
    }
});

router.get('/reservations/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const reservations = await Reservation.find({ username });
        let seats = [];
        if (reservations[0]) seats = reservations[0].seatNumbers;
        res.json(seats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/seats', async (req, res) => {
    try {
        const user = await Reservation.find({});
        const result = [];
        user.forEach((item) => {
            let arr = item.seatNumbers;
            arr.forEach((val) => {
                result.push(val)
            })
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/reset', async (req, res) => {
    try {
        await Reservation.deleteMany({});
        res.json("Reseted the value");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
