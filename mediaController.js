const Complaint = require('../models/Complaint');

exports.getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ date: -1 }).populate('userId', 'username');
        res.status(200).json(complaints);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
