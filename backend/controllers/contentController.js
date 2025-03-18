const content = require('../models/content.json');


exports.getAllContent = (req, res) => {
    res.json(content);
};
