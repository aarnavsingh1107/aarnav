const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
