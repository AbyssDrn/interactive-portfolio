const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Import the Schema we made earlier

// @route  GET /api/projects
// @desc   Get all projects
// @access Public
router.get('/', async (req, res) => {
    try {
        // .find() is a Mongoose command to get EVERYTHING in this collection
        const projects = await Project.find();
        res.json(projects);  // Send the data back as JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/projects
// @desc    Add a new project
// @access  Public (We will secure this later)
router.post('/', async (req, res) => {
    // Create a new project object using the data sent from the frontend (req.body)
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
        githubLink: req.body.githubLink,
        image: req.body.image,
        liveDemoLink: req.body.liveDemoLink
    });

    try {
        // Save it to the database
        const savedProject = await newProject.save();
        res.status(201).json(savedProject); // 201 means "Created successfully"
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
