const express = require('express');

const ContentController = require('./controllers/ContentController');
const SlidesContentController = require('./controllers/SlidesContentController');
const CultController = require('./controllers/CultController');

const routes = express.Router();


routes.get('/content/:id/slides', SlidesContentController.listByContent);
routes.get('/content', ContentController.index);
routes.post('/content', ContentController.create);
routes.get('/cult', CultController.index);
routes.post('/cult', CultController.add);
routes.delete('/cult/:id', CultController.remove);
routes.delete('/cult', CultController.removeAll);

module.exports = routes;