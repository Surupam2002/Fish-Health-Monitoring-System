// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');

// const app = express();
// const port = 3000;

// // Database connection
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'pisiculture',
//     password: 'Arpan@2002',
//     port: 5432,
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// // Login endpoint
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
//         if (result.rows.length > 0) {
//             res.send('Login successful');
//         } else {
//             res.send('Invalid credentials');
//         }
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// // Register endpoint
// app.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
//         res.send('Registration successful');
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pisiculture',
  password: 'Arpan@2002',
  port: 5432,
});

client.connect();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
    res.json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Serve index2.html after successful login
app.get('/index2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
