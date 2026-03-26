const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Load DB
let db = JSON.parse(fs.readFileSync('../database/data.json'));

// Temp cart
let cart = [];

// 🔥 MENU API
app.get('/menu', (req, res) => {
    res.json(db.menu);
});

// 🛒 ADD TO CART
app.post('/add-to-cart', (req, res) => {
    let { item, addon } = req.body;

    let price = db.menu[item];

    if (addon === "mustard") price += 20;
    if (addon === "chilli") price += 20;
    if (addon === "cheese") price += 40;

    cart.push({ item, price });

    res.json({ message: "Added", cart });
});

// 📦 GET CART
app.get('/cart', (req, res) => {
    res.json(cart);
});

// ✅ CONFIRM
app.post('/confirm', (req, res) => {
    db.orders.push(...cart);

    fs.writeFileSync('../database/data.json', JSON.stringify(db, null, 2));

    cart = [];

    res.json({ message: "✅ Order placed!" });
});

// ❌ CANCEL
app.post('/cancel', (req, res) => {
    cart = [];
    res.json({ message: "❌ Order cancelled" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});