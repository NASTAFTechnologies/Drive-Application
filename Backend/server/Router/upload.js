const express = require('express');
const router = express.Router();
// const nodemailer = require('nodemailer');
const db = require('../../db');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: 'uploads/' });

//file upload in tripsheet
router.post('/uploads', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const fileData = {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path.replace(/\\/g, '/').replace(/^uploads\//, ''),
        tripid: req.body.tripid,
    };
    const query = 'INSERT INTO tripsheetupload SET ?';
    db.query(query, fileData, (err, result) => {
        if (err) {
            console.error('Error storing file in the database:', err);
            return res.status(500).json({ error: 'Error storing file in the database.' });
        }
        return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
    });
});
//space
const imageDirectory = path.join(__dirname, 'uploads'); // Adjust the path as needed
// Serve static files from the imageDirectory
router.use('/images', express.static(imageDirectory));
// Example route to serve an image by its filename
router.get('/get-image/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(imageDirectory, filename);
    fs.access(imagePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.error('Error accessing image:', err);
            res.status(404).send('Image not found');
        } else {
            res.sendFile(imagePath, (err) => {
                if (err) {
                    console.error('Error sending image:', err);
                    res.status(404).send('Image not found');
                }
            });
        }
    });
});
//end tripsheet file upload
// updating trip toll and parking
router.post('/update_updatetrip', (req, res) => {
    const { toll, parking, tripid } = req.body;
    const query = 'UPDATE tripsheet SET toll = ?, parking = ? WHERE tripid = ?';

    db.query(query, [toll, parking, tripid], (err, results) => {
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