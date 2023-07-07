const { Router } = require('express');

const handlebarsController = require('./handlebarsController/handlebarsController');

const router = Router();

router.get('/', handlebarsController.getChat);
router.get('/home', handlebarsController.getHome);
router.get('/realTimeProducts', handlebarsController.getRealTimeProducts);

module.exports = (app) => {
  app.use(router);
};
