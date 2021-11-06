const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./Models/blogModel');

//register app

const app = express();

//resgister database

const dbURI = "mongodb+srv://hecker:hecker1234@nodetut.xp5ie.mongodb.net/nodetuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
  app.listen(3000, () => {
    console.log("app is listening goes brrrr")
  })
})
.catch((err) => {
  console.log(err.message)
  console.log(err.code)
})


// set view engine

app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'))
app.use(morgan('tiny'))
//mongodb sandbox and routes

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: "Hello world!",
    snippet: "Hello world!",
    body: "Lorem ipsum dolor sit amet, consectetur"
  })

  blog.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err);
  })
})

app.get('/all-blogs', (req, res) => {

  Blog.find()
    .then((blog) => {
      res.send(blog);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/single-blog', (req, res) => {
  Blog.findById().then(resulter => {
    console.log(resulter).then(() => {
      console.log("Hello world")
    })
  })
})

// set routes

app.get('/', (req, res) => {
  res.redirect('/blogs');  
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
    
})

app.get('/blogs', async(req, res) => {
  const result = await Blog.find().sort({ createdAt: -1 })
  res.render('index', { title: 'blogs', blogs: result })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create'})
})

app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).render('404')
})
