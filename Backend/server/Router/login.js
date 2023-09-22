const express = require('express');
const router = express.Router();
const db = require('../../db');
const multer = require('multer');
const path = require('path'); // Import path module

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profile_photos/'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

router.use('/profile_photos', express.static(path.join(__dirname, 'profile_photos')));
console.log(path.join(__dirname, 'profile_photos'));
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
//get profile details
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
// updating profile page
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
//uploading profile image
router.post('/uploadProfilePhoto', upload.single('avatar'), (req, res) => {
    const { username } = req.query;
    const filePath = req.file.path;
    const updateQuery = 'UPDATE usercreation SET profile_image = ? WHERE username = ?';
    db.query(updateQuery, [filePath, username], (err, results) => {
        if (err) {
            console.error('Error updating profile photo:', err); // Log the error
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        console.log('Profile photo uploaded successfully');
        res.status(200).json({ message: 'Profile photo uploaded successfully' });
    });
});
//end

module.exports = router;