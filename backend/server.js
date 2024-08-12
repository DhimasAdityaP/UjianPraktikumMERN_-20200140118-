const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Ganti dengan URL koneksi MongoDB Anda
const mongoURI = 'mongodb+srv://dimas:01052002@cluster1.730wnyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

// Koneksi ke MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
