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
router.put('/updateProfile', (req, res) => {
    const username = req.query.username; // Use req.query to get the username as a query parameter
    const userData = req.body;
    console.log('username:', username);
    console.log('Updated billing data:', userData);
    db.query('UPDATE usercreation SET ? WHERE username = ?', [userData, username], (err, result) => {
        if (err) {
            console.error('Error updating data in MySQL:', err);
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        console.log('Data updated in MySQL');
        return res.status(200).json({ message: "Data updated successfully" });
    });
});
module.exports = router;