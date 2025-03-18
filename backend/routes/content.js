const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../models/content.json');

const getData = () => {
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(jsonData);
};

router.get('/articles', (req, res) => {
  const data = getData();
  res.json(data.articles);
});

router.get('/prestations', (req, res) => {
  const data = getData();
  res.json(data.prestations);
});

router.get('/contact', (req, res) => {
  const data = getData();
  res.json(data.contact);
});

router.get('/mentions', (req, res) => {
  const data = getData();
  res.json(data.mentionsLegales);
});

module.exports = router;