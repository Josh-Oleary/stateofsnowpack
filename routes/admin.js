const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const User = require('../models/user');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// middleware to check if user is admin
router.use('/', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
        return;
    }
    req.flash('error', 'you are not an admin')
    res.redirect('/')
});
// routes for the admin section of the site
router.get('/', (req, res) => {
    res.render('admin/home')
});

router.get('/addReport', (req, res) => {
    res.render("admin/addReport")
});
//uploading video report using multer and cloudinary
router.post('/addReport', upload.array('video', 1), async (req,res) => {
    try {
        const { date, location } = req.body;
        const report = new Report({ date, location });
        report.video = req.files.map(f => ({url: f.path, filename: f.filename}));
        report.author = req.user._id;
        console.log(report);
        await report.save((err, doc) => {
            if(err) console.log(err);
            console.log(doc);
        })
        res.redirect('/');
    } catch (e) {
        console.log(e);
    }
});
router.get('/owner', (req, res) => {
    res.render('admin/owner')
})
//routes altering admin status on user object
router.post('/owner', async (req, res) => {
    try{
    const email = req.body.makeAdminEmail;
    const filter = { email: email }
    const update = { isAdmin: true };
    let updatedUser = await User.findOneAndUpdate(filter, update, { new: true});
    console.log(updatedUser);
    res.send(`Successfuly made ${updatedUser.name} and admin`)
    } catch (e) {
        console.log(e);
    }
})
router.put('/owner', async (req, res) => {
    try {
    const email = req.body.deleteAdminEmail;
    const filter = { email: email }
    const update = { isAdmin: false };
    let updatedUser = await User.findOneAndUpdate(filter, update, { new: true});
    console.log(updatedUser);
    res.send(`${updatedUser.name} is no longer an Admin`);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;