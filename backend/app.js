//Holds all belongs to express framework
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();
mongoose.connect("mongodb+srv://mustafa:xB6SrVi7tX4QwQ2@cluster0.ghmfl.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=>{
    console.log('Connected to Mongodb Database !');
  })
  .catch(()=>{
    console.log('Connection Failed !...');
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

//xB6SrVi7tX4QwQ2
app.post('/api/posts', (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save() //In backend moongose create the right query in db for this
    .then(createdPost => {
      console.log(createdPost);
      res
        .status(201)
        .json({
          message: 'Post added successfully',
          postId: createdPost._id
        });
    });
});

app.get('/api/posts', (req, res, next)=>{
  Post.find()
    .then(documents => {
      console.log(documents);
      res
        .status(200)
        .json({
          message: 'Post fetched Successfully !',
          posts: documents
        });
    }); //Get all entries in Mongodb posts
});

app.delete('/api/posts/:id', (req, res, next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post Deleted !...'});
  });
});

module.exports = app;
