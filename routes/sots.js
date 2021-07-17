const express = require('express');
const router = express.Router();
const Report = require('../models/report');

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/team', (req,res) => {
    res.render('team');
});
router.get('/contact', (req,res) => {
    res.render('contact');
});
//route for reaching nelson report page
router.get('/nelson', (req, res) => {
    Report.find({}, (err, nelsonReports) => {
        if(err){
            console.log(err)
        } else {
            res.render('locations/nelson', {reports: nelsonReports})
        }
    })
})
// router.get('/golden', (req, res) => {
//     Report.find({}, (err, goldenReports) => {
//         if(err){
//             console.log(err)
//         } else {
//             res.render('locations/golden', {reports: goldenReports})
//         }
//     })
// })
module.exports = router;