const express = require('express');
const path = require('path');
const app = express();
app.use(function(req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
// Set the static folder to serve static files like index.html
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(10124, () => {
  console.log('Server is running on port 10124');
});
