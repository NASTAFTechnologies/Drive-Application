const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('../db');
const path = require('path');


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/profile_photos', express.static('server/profile_photos'));//profile photo display code
app.use('/signature_photos', express.static('/Router/path_to_save_images'));//profile photo display code
app.use('/uploads', express.static('/uploads'));//profile photo display code


app.get('/', (req, res) => {
  return res.json({ message: "Hello from the backend side" });
});
//connect from route folder
const loginRoutes = require('./Router/login');
const bookingdetails = require('./Router/bookingdetails');
const closedbookingdetails = require('./Router/closedbooking');
const historypagedetails = require('./Router/historypage');
const signaturerouter = require('./Router/signature');
const closedutyrouter = require('./Router/closeduty');
const uploadbill = require('./Router/upload');

//profile photo display code
app.get('/profile_photos', (req, res) => {
  const { username } = req.query;
  const selectQuery = 'SELECT profile_image FROM usercreation WHERE username = ?';
  db.query(selectQuery, [username], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }
    const profileImagePath = results[0].profile_image;
    res.status(200).json({ profileImagePath });
  });
});


//signature image get

app.get('/signature_photos', (req, res) => {
  const { tripid } = req.query;
  const selectQuery = 'SELECT signature_path FROM signatures WHERE tripid = ?';
  db.query(selectQuery, [tripid], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Signature not found' });
      return;
    }
    const uploadedImagePath = results[0].signature_path;

    // Calculate the relative path
    const baseImagePath = path.join(__dirname, 'path_to_save_images');
    const relativeImagePath = path.relative(baseImagePath, uploadedImagePath);

    // Remove any `..` segments from the relative path
    const cleanedRelativePath = relativeImagePath
      .split(path.sep)
      .filter(segment => segment !== '..')
      .join(path.sep);

    res.status(200).json({ uploadedImagePath: cleanedRelativePath });
  });
});

//get attached image

app.get('/uploads', (req, res) => {
  const { tripid } = req.query;
  const selectQuery = 'SELECT path FROM upload WHERE tripid = ?';
  db.query(selectQuery, [tripid], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }
    const attachedImagePaths = results.map((result) => result.path);
    res.status(200).json({ attachedImagePaths });
  });
});



// login Database
app.use('/', loginRoutes);
// // End login database

// view booking Database
app.use('/', bookingdetails);
// // End login database

// login Database
app.use('/', closedbookingdetails);
// // End login database

// login Database
app.use('/', historypagedetails);
// // End login database

// login Database
app.use('/', signaturerouter);
// // End login database

// login Database
app.use('/', closedutyrouter);
// // End login database

// login Database
app.use('/', uploadbill);
// // End login database



const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});