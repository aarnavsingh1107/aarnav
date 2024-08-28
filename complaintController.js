const Complaint = require('../models/Complaint');
const multer = require('multer');
const path = require('path');

// Image storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

exports.registerComplaint = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { userId, location, description } = req.body;
            const complaint = new Complaint({
                userId,
                location,
                description,
                imageUrl: `/uploads/${req.file.filename}`,
            });
            await complaint.save();
            res.status(201).json({ message: 'Complaint registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];
