const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Redwan',
  password: 'Redwan98',
  database: 'book_management',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for data entry form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'data-entry.html'));
});

// Define API endpoint for submitting book data
app.post('/api/books', (req, res) => {
    const { bookName, publisher, age, pageCount, publishDate, bookType } = req.body;
  
    const query = 'INSERT INTO books (bookName, publisher, age, pageCount, publishDate, bookType) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [bookName, publisher, age, pageCount, publishDate, bookType];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error
  ('Error inserting book: ', err);
  res.status(500).json({ error: 'Failed to insert book' });
  return;
  }
  
  res.status(201).json({ message: 'Book inserted successfully' });
});
});

// Start the server
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

  


