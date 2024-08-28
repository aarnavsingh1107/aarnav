const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Route to handle complaints
router.post('/register', complaintController.registerComplaint);

module.exports = router;
