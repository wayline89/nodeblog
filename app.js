const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes')
//express app

const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://wayline:test@nodecrash.2vqgrbh.mongodb.net/nodecrash?retryWrites=true&w=majority&appName=nodecrash";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000);
    console.log(`Connected to MongoDB - Connection string :  ${dbURI}`);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

//register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blog routes 
app.use('/blogs',blogRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});