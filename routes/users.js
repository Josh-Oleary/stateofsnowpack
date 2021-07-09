const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const isLoggedIn = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to SOTS');
            res.redirect('/');
        })
    } catch {
        req.flash('error', e.message);
        res.redirect('register')
    }
});
router.get('/login', (req, res) => {
    res.render('users/login');
})
router.post('/login', passport.authenticate('local', { failureFlash: 'invalid username or password', failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
     );
router.get('/logout', (req, res) => {
    req.logout();
    console.log('logged out');
    req.flash('success', 'Goodbye!');
    res.redirect('/');
})
module.exports = router;