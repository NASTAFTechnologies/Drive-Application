const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/tripsheetfilter/:username', (req, res) => {
    const username = req.params.username; // Corrected parameter name
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        const query = "SELECT * FROM tripsheet WHERE driverName = ? AND startdate >= ? AND startdate <= ? ";
        db.query(query, [username, startDate, endDate], (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            // Check if trip sheet data was found
            if (results.length === 0) {
                res.status(404).json({ message: 'Trip sheet not found' });
                return;
            }
            res.status(200).json(results); // Send filtered data
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;