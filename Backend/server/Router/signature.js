const express = require('express');
const router = express.Router();
const fs = require('fs'); // signature png
const db = require('../../db');
const path = require('path');

// Define a constant for the base path to save images
const baseImagePath = path.join(__dirname, 'path_to_save_images');

router.post('/api/saveSignature', (req, res) => {
    const { tripid, signatureData } = req.body;

    const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const imageName = `signature-${Date.now()}.png`;
    const imagePath = path.join(baseImagePath, imageName); // Use the base path

    fs.writeFile(imagePath, imageBuffer, (error) => {
        if (error) {
            res.status(500).json({ error: 'Failed to save signature' });
        } else {
            const relativeImagePath = path.relative(baseImagePath, imagePath); // Calculate relative path
            const sql = 'INSERT INTO signatures (tripid, signature_path) VALUES (?, ?)';
            db.query(sql, [tripid, relativeImagePath], (dbError, results) => {
                if (dbError) {
                    res.status(500).json({ error: 'Failed to save signature' });
                } else {
                    res.json({ message: 'Signature saved successfully' });
                }
            });
        } 
    });
});

module.exports = router;
