import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import cors from "cors";
import path from "path";
import cookieSession from "cookie-session";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_auth",
});

const dbForum = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "forum",
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend port
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`);

dbForum.query(`
  CREATE TABLE IF NOT EXISTS threads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL
  )
`);

dbForum.query(`
  CREATE TABLE IF NOT EXISTS replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thread_id INT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE
  )
`);

app.get('/api/threads/:category', (req, res) => {
  const { category } = req.params;
  const query = 'SELECT * FROM threads WHERE category = ?';
  dbForum.query(query, [category], (error, results) => {
    if (error) {
      console.error('Error fetching threads:', error);
      res.status(500).json({ error: 'Error fetching threads' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/threads', (req, res) => {
  const { title, content, category, link } = req.body;
  const query = 'INSERT INTO threads (title, content, category, link) VALUES (?, ?, ?, ?)';
  dbForum.query(query, [title, content, category, link], (error, results) => {
    if (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: 'Error creating thread' });
      return;
    }
    res.json({ id: results.insertId, title, content, category, link });
  });
});

// Fetch a thread by link
app.get('/api/threads/:link', (req, res) => {
  const { link } = req.params;
  const query = `SELECT * FROM threads WHERE link = ?`;
  dbForum.query(query, [link], (error, results) => {
    if (error) {
      console.error('Error fetching thread:', error);
      res.status(500).json({ error: 'Error fetching thread' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Thread not found' });
      return;
    }
    console.log('Thread data received:', results); // Debugging
    res.json(results);
  });
});

app.get('/api/replies/:link', (req, res) => {
  const { link } = req.params;
  const query = `
    SELECT r.* FROM replies r
    JOIN threads t ON r.thread_id = t.id
    WHERE t.link = ?
  `;
  dbForum.query(query, [link], (error, results) => {
    if (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Error fetching replies' });
      return;
    }
    console.log('Replies data received:', results); // Debugging
    res.json(results);
  });
});

// Create a new reply
app.post('/api/replies', (req, res) => {
  const { threadId, content } = req.body;
  console.log('Received payload:', req.body);

  if (!threadId || !content) {
    console.error('Validation error: threadId and content are required');
    res.status(400).json({ error: 'threadId and content are required' });
    return;
  }

  const query = 'INSERT INTO replies (thread_id, content) VALUES (?, ?)';
  dbForum.query(query, [threadId, content], (error, results) => {
    if (error) {
      console.error('Error creating reply:', error);
      res.status(500).json({ error: 'Error creating reply' });
      return;
    }
    res.json({ id: results.insertId, threadId, content });
  });
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
const sessionMiddleware = cookieSession({
  name: "session",
  keys: ["defaultSecretKey"],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

app.use(sessionMiddleware);

// Middleware to wrap session for Socket.IO
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.use((socket, next) => {
  if (socket.request.session && socket.request.session.user) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

// Register user
app.post("/api/register", (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query =
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
  db.query(query, [email, username, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      res.status(500).json({ message: "Registration failed" });
    } else {
      res.status(200).json({ message: "Registration successful" });
    }
  });
});

// Login user
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ message: "Login failed: Database error" });
    } else {
      if (results.length === 0) {
        res.status(401).json({ message: "Login failed: User not found" });
      } else {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {
            username: user.username,
            email: user.email,
          };
          res
            .status(200)
            .json({
              message: "Login successful",
              username: user.username,
              email: user.email,
            });
        } else {
          res.status(401).json({ message: "Login failed: Incorrect password" });
        }
      }
    }
  });
});

// Logout user
app.get("/api/logout", (req, res) => {
  req.session = null;
  res.status(200).json({ message: "Logout successful" });
});

// Get user profile
app.get("/api/profile", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Socket.io for live chat
io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Session data:", socket.request.session); // Log session data to ensure it is available

  socket.on("sendMessage", (data) => {
    const { message } = data;
    const username = socket.request.session.user?.username; // Retrieve username from session
    if (username) {
      io.emit("receiveMessage", { username, message });
      console.log(`Message from ${username}: ${message}`);
    } else {
      console.error("Username not found in session");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server on port 5000
const PORT = 5000;
server.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
