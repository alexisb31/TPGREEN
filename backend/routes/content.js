const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../models/content.json');

const getData = () => {
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(jsonData);
};

const saveData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};

router.get('/articles', (req, res) => {
  const data = getData();
  res.json(data.articles);
});

router.post('/articles', (req, res) => {
  const data = getData();
  const newArticle = {
    id: data.articles.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  data.articles.push(newArticle);
  saveData(data);
  res.status(201).json(newArticle);
});

router.delete('/articles/:id', (req, res) => {
  const data = getData();
  const articleId = parseInt(req.params.id, 10);
  data.articles = data.articles.filter(article => article.id !== articleId);
  saveData(data);
  res.status(200).json({ message: 'Article supprimé avec succès' });
});

router.get('/prestations', (req, res) => {
  const data = getData();
  res.json(data.prestations);
});

router.post('/prestations', (req, res) => {
  const data = getData();
  const newPrestation = {
    id: data.prestations.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  data.prestations.push(newPrestation);
  saveData(data);
  res.status(201).json(newPrestation);
});

router.delete('/prestations/:id', (req, res) => {
  const data = getData();
  const prestationId = parseInt(req.params.id, 10);
  data.prestations = data.prestations.filter(prestation => prestation.id !== prestationId);
  saveData(data);
  res.status(200).json({ message: 'Prestation supprimée avec succès' });
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