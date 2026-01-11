const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// @route   GET /api/profile
// @desc    Get my profile data
router.get('/', async (req, res) => {
    try {
        // Get the first document found
        const profile = await Profile.findOne();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route    POST /api/profile
// @desc     Create or Update profile
router.post('/', async (req, res) => {
    try {
        // We use "findOneAndUpdate" to handle both creating and updating
        // 1. Find the first document.
        // 2. Update it with "reg.body" (the new data).
        // 3. "upsert: true" means "If it doesn't exist, create it!"
        const newProfile = await Profile.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );
        res.json(newProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
