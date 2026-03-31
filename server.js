// server.js
require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.get("/admin.html", (req, res, next) => {
  if (req.session.loggedIn) {
    next(); // allow access
  } else {
    res.redirect("/login.html"); // send back to login
  }
});

app.use(express.static("public")); // Serve frontend files from 'public'

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",     
  password: "",        
  database: "volt_kenya"
});

db.connect(err => {
  if (err) {
    console.error(" Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// ---- ROUTES ----

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Example credentials (you can store these in the database later)
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.loggedIn = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.redirect("/login.html");
  });
});


// Get all ports
app.get("/api/ports", (req, res) => {
  db.query("SELECT * FROM ports", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new port 
app.post("/api/ports", (req, res) => {
  const { server_port, local_ip, location, lat, lng } = req.body;

  const sql = "INSERT INTO ports (server_port, local_ip, location, lat, lng) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [server_port, local_ip, location, lat || null, lng || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Port added successfully!", id: result.insertId });
  });
});

//  Delete a port
app.delete("/api/ports/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM ports WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: " Port deleted successfully!" });
  });
});

//update port
app.put("/api/ports/:id", (req, res) => {
  const { id } = req.params;
  const { server_port, local_ip, location, status, lat, lng } = req.body;

  const fields = [];
  const values = [];

  if (server_port) { fields.push("server_port = ?"); values.push(server_port); }
  if (local_ip)     { fields.push("local_ip = ?"); values.push(local_ip); }
  if (location)     { fields.push("location = ?"); values.push(location); }
  if (status)       { fields.push("status = ?"); values.push(status); }
  if (lat !== undefined) { fields.push("lat = ?"); values.push(lat); }
  if (lng !== undefined) { fields.push("lng = ?"); values.push(lng); }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  const sql = `UPDATE ports SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating port:", err);
      return res.status(500).json({ error: "Database update failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Port not found" });
    }
    res.json({ message: "✅ Port updated successfully" });
  });
});

// Add a payment
app.post('/api/payments', (req, res) => {
  try {
    const { port_id, amount, kwh, phone, timestamp } = req.body;

    // Basic validation
    const a = parseFloat(amount);
    const k = parseFloat(kwh);

    if (Number.isNaN(a) || a < 50)
      return res.status(400).json({ error: 'Invalid amount' });

    if (Number.isNaN(k))
      return res.status(400).json({ error: 'Invalid kWh value' });

    if (!phone || typeof phone !== 'string')
      return res.status(400).json({ error: 'Phone number required' });

    if (!port_id)
      return res.status(400).json({ error: 'port_id is required' });

    const paymentDate = timestamp ? new Date(timestamp) : new Date();

    const sql = `
      INSERT INTO payments (port_id, amount, payment_date, status, phone, kwh)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [port_id, a.toFixed(2), paymentDate, 'completed', phone, k.toFixed(3)],
      (err, result) => {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ error: 'Database insert failed' });
        }
        res.status(201).json({
          ok: true,
          id: result.insertId,
          message: 'Payment stored (pending)',
        });
      }
    );
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

//Get payments
app.get("/api/payments", (req, res) => {
  const sql = `
    SELECT payments.*, ports.location, ports.server_port
    FROM payments
    LEFT JOIN ports ON payments.port_id = ports.id
    ORDER BY payments.payment_date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});




const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
