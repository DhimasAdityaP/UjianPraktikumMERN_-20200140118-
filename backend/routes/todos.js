const express = require('express')
const Todo = require('../models/Todo')
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
    try {
    const todos = await Todo.find();
    res.json(todos);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Create a new todo
router.post('/', async (req, res) => {
    const todo = new Todo({
    text: req.body.text,
});
try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).end(); 
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

module.exports = router;
