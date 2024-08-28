const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Route to get media (complaints)
router.get('/', mediaController.getComplaints);

module.exports = router;
