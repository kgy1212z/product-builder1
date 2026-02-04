const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Using promises-based fs
const path = require('path');

const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON bodies

// --- API Endpoint ---
app.get('/api/destinations', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error("Failed to read data.json:", error);
        res.status(500).json({ error: "Failed to load destination data." });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
