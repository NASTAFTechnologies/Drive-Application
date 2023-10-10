const express = require('express');
const router = express.Router();
const fs = require('fs'); // signature png
const db = require('../../db');
const nodemailer = require('nodemailer');
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


//send email from booking page
router.post('/send-email', async (req, res) => {
    try {


        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'akash02899@gmail.com',
                pass: 'yocakaoeoajdaawj',
            },
        });

        const customerMailOptions = {
            from: 'akash02899@gmail.com',
            to: 'akash02899@gmail.com',
            subject: 'Greetings from Jessy Cabs',
            text: `Hello,\n\nYour choice of [Your Cab Service] is much appreciated. We're committed to delivering exceptional service, and we can't wait to welcome you back for another remarkable journey\n\nRegards,\nJessy Cabs`,
        };

        // Send greeting email to the customer
        await transporter.sendMail(customerMailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});
//end booking mail

module.exports = router;
