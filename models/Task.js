// models/Task.js
const mongoose = require('mongoose');

// Schema mendefinisikan struktur data
const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true, // Wajib diisi
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);