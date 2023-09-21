const express = require('express');
const router = express.Router();
const db = require('../../db');
// login page databse fetch:    
router.post('/login', (req, res) => {
    const { username, userpassword } = req.body;
    if (!username || !userpassword) {
        return res.status(400).json({ error: 'Username and userpassword are required.' });
    }
    db.query('SELECT * FROM usercreation WHERE username = ? AND userpassword = ?', [username, userpassword], (err, result) => {
        if (err) {
            console.error('Error retrieving user details from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve user details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials. Please check your username and userpassword.' });
        }
        return res.status(200).json({ message: 'Login successful', user: result[0] });
    });
});
//
router.get('/getDriverProfile', (req, res) => {
    const username = req.query.username;
    const query = 'SELECT * FROM usercreation WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching driver profile:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        const driverProfile = results[0];
        res.status(200).json(driverProfile);
    });
});

// updating trip toll and parking
router.post('/update_updateprofile', (req, res) => {
    const { ufirstname, mobileno, userpassword, userconfirmpassword, email, username } = req.body;
    const query = 'UPDATE usercreation SET ufirstname = ?, mobileno = ?, userpassword = ?, userconfirmpassword = ?, email = ? WHERE username = ?';

    db.query(query, [ufirstname, mobileno, userpassword, userconfirmpassword, email, username], (err, results) => {
        if (err) {
            console.error('Error updating status:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ message: 'Status updated successfully' });
    });
});
//end
module.exports = router;