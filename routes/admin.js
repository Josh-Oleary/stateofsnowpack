const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if(req.query.isAdmin){
        next();
    }
    res.send('Not an Admin!')
})

router.get('/home', (req, res) => {
    res.send('Admin homepage')
});



module.exports = router;