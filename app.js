if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path')
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const User = require('./models/user');
const methodOverride = require('method-override');
//declaring external route files
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/users');
const publicRoutes = require('./routes/sots')
//connecting database
mongoose.connect('mongodb://localhost:27017/SOTS', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected')
})
//initializing express app
const app = express();

app.use(express.static((path.join(__dirname + '/public'))));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//configuring session
app.use(session({
    resave: false, 
    saveUninitialized: true, 
    secret: 'devsecret',
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
    //store: mongo memory store
}));
app.use(flash());
//authentication middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email'
    }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//setting up custom middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.isAdmin = req.user.isAdmin;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
//routing middleware
app.use('/', userRoutes)
app.use('/', publicRoutes)
app.use('/admin', adminRoutes)




app.listen(3000, () =>{
    console.log('Listening on 3000')
})