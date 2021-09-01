const express = require('express');
const expressLayouts = require('express-ejs-layouts');
//bring in mongoose
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');





//bring in method override
const methodOverride = require('method-override');

// Passport Config
require('./config/passport')(passport);
const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();
//connect to mongoose
const db = 'mongodb+srv://admin:admin@cluster0.siqxe.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,
  useFindAndModify: false,})
  .then(() => console.log('MongoDB Conneced'))
  .catch(err => console.log(err));

//set template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
//route for the index
app.get('/index', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });
  

  response.render('index', { blogs: blogs });

});




// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.use('/uploads', express.static('uploads'))

app.use(express.static('public'));
app.use('/blogs', blogRouter);



//listen port
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
	console.log(`Server is running on ${PORT}`)
});