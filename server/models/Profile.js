const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {type: String, required: true },
  title: {type: String, required: true }, // e.g., "Full Stack Developer"
  aboutMe: {type: String, required: true }, // Your detailed bio
  photoUrl: {type: String }, // Your "Suit" photo

  // Specific fields for your vision
  goals: { type: String }, // "My goal is to evolve..."
  passions: {type: [String] }, // ["AI", "Open Source", "Teaching"]

  resumeLink: { type: String }, // URL to your CV
  
  // Social Links
  socials: {
    github: String,
    linkedin: String,
    twitter: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
