// server.js
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- Middleware ---
app.use(cors());          
app.use(express.json());  

// --- Koneksi Database MongoDB ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('✅ MongoDB Connected!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1); 
  }
};
connectDB();

// --- Route Default ---
app.get('/', (req, res) => {
  res.send('API Running...');
});

// Anda akan menambahkan ini nanti:
// app.use('/api/tasks', require('./routes/taskRoutes')); 

// --- Server Listening ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));


// server.js (di sekitar baris Route Default)
// ...

// --- Route Default ---
app.get('/', (req, res) => {
  res.send('API Running...');
});

// --- Integrasi Task Routes ---
// Semua route di taskRoutes.js akan diakses melalui /api/tasks
app.use('/api/tasks', require('./routes/taskRoutes')); 

// --- Server Listening ---
// ...