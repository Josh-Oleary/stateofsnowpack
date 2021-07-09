const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/team', (req,res) => {
    res.render('team');
});
router.get('/contact', (req,res) => {
    res.render('contact');
});

module.exports = router;