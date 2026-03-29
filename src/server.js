const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Add your password
  database: 'job_recommendation_system',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
};

// Admin Login (Authentication)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
    if (err || !results.length) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const admin = results[0];
    if (bcrypt.compareSync(password, admin.password)) {
      const token = generateToken(admin.id);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// User Login (Authentication)
app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err || !results.length) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = results[0];
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user.id);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Get all jobs (User or Admin)
app.get('/api/jobs', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching jobs' });
    }
    res.json(results);
  });
});

// Add a new job (Admin only)
app.post('/api/jobs', (req, res) => {
  const { title, description, imageUrl, isHot } = req.body;
  db.query(
    'INSERT INTO jobs (title, description, image_url, is_hot) VALUES (?, ?, ?, ?)',
    [title, description, imageUrl, isHot],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding job' });
      }
      res.status(201).json({ message: 'Job added successfully' });
    }
  );
});

// Apply for a job (User only)
app.post('/api/apply', (req, res) => {
  const { userId, jobId } = req.body;
  db.query(
    'INSERT INTO applications (user_id, job_id) VALUES (?, ?)',
    [userId, jobId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error applying for job' });
      }
      res.status(201).json({ message: 'Application submitted successfully' });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
