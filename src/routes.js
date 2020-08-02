const express = require('express');

const ContentController = require('./controllers/ContentController');
const SlidesContentController = require('./controllers/SlidesContentController');

const routes = express.Router();


routes.get('/content/:id/slides', SlidesContentController.listByContent);
routes.get('/content', ContentController.index);
routes.post('/content', ContentController.create);

module.exports = routes;