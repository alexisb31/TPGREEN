const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

const contentRoutes = require('./routes/content');

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use('/api/content', contentRoutes);

app.listen(PORT, () => console.log(`en route sur http://localhost:${PORT}`));