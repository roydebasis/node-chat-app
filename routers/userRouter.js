//External imports
const express = require('express');

//Internal imports
const { getUsers } = require('../controllers/userController');
const {decorateHtmlResponse} = require("../middlewares/common/decorateHtmlResponse");
const router = express.Router();

router.get('/', decorateHtmlResponse('Users'), getUsers);

module.exports = router;