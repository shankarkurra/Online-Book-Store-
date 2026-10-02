const express = require('express');
const router = express.Router();
const { getBooks, getBookById, getShowcase } = require('../controllers/bookController');

router.get('/showcase', getShowcase);
router.get('/', getBooks);
router.get('/:id', getBookById);

module.exports = router;
