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


// login Database
app.use('/', loginRoutes);
// // End login database

const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});