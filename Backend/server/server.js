const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

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