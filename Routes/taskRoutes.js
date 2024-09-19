const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');  
const router = express.Router();

router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tasks', auth, async (req, res) => {
    console.log("working.....")
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description, userId: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ msg: 'Task not found' });
  
      if (task.userId.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not authorized' });
      }
  
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = typeof req.body.completed === 'boolean' ? req.body.completed : task.completed;
  
      await task.save();
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  router.delete('/:id', auth, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ msg: 'Task not found' });
  
      if (task.userId.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not authorized' });
      }

      await Task.deleteOne({ _id: req.params.id });
      res.json({ msg: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;
