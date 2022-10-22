const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 80;

const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// PATHS
const categories = require('./prd/categories');

app.get('/', async (req, res) => {
    res.status(403).sendFile(path.join(__dirname, '/403.html'));
});

// Global public routes
app.get('/api/prd/categories/all', categories.listAll)
app.get('/api/prd/categories/:category/products/:page', categories.listProducts)

app.listen(port);