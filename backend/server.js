const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Enable CORS (VERY IMPORTANT)
app.use(cors());

// Read database
const data = JSON.parse(fs.readFileSync('../database/data.json'));

// API route
app.get('/price/:item', (req, res) => {
    const item = req.params.item;
    const price = data[item];

    if (price) {
        res.json({ price: price });
    } else {
        res.json({ price: "Item not found" });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});