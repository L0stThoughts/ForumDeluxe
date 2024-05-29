import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import path from 'path';
import cookieSession from 'cookie-session';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user_auth'
});

app.use((req, res, next) => {
  cookieSession({
    name: 'session',
    keys: req.session && req.session.secretKey ? [req.session.secretKey] : ['defaultSecretKey'], // Use the user's key or a default key
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })(req, res, next);
});

app.post('/api/register', (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
  db.query(query, [email, username, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Registration failed' });
    } else {
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Login failed: Database error' });
    } else {
      if (results.length === 0) {
        res.status(401).json({ message: 'Login failed: User not found' });
      } else {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
          const secretKey = crypto.randomBytes(32).toString('hex'); // Generate a unique key for this session
          req.session.secretKey = secretKey;
          req.session.user = {
            username: user.username,
            email: user.email
          };
          res.status(200).json({ message: 'Login successful', username: user.username, email: user.email });
        } else {
          res.status(401).json({ message: 'Login failed: Incorrect password' });
        }
      }
    }
  });
});

app.get('/api/logout', (req, res) => {
  req.session = null;
  res.status(200).json({ message: 'Logout successful' });
});

app.get('/api/profile', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

const PORT = 5000;
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
