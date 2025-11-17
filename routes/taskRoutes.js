// routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task'); // Panggil model Tugas
const router = express.Router();

// 1. GET /api/tasks (Baca Semua Tugas)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 2. POST /api/tasks (Buat Tugas Baru)
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// 3. PUT /api/tasks/:id (Perbarui Tugas)
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Mengembalikan yang baru
    );
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 4. DELETE /api/tasks/:id (Hapus Tugas)
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;