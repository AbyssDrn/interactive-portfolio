const mongoose = require('mongoose');

// Define the shape of a "Project"
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // We MUST have a title
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // This will be a URL to the image
    default: "https://via.placeholder.com/150" // Default if you don't upload one
  },
  technologies: {
    type: [String], // An Array of strings (e.g., ["React", "Node", "MongoDB"])
    required: true
  },
  githubLink: {
    type: String,
    required: true
  },
  liveDemonLink: {
    type: String,
  }
}, {
  timestamps: true // Automatically adds "createAt" and "updateAt" times
});

// Compile it into a Model and export it
module.exports = mongoose.model('Project', projectSchema);
