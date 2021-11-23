//Holds all belongs to express framework
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
app.post('/api/posts', (req, res, next)=>{
  const post = req.body;
  console.log(post);
  res
    .status(201)
    .json({
      message: 'Post added successfully'
    });
});
app.get('/api/posts', (req, res, next)=>{
  const posts = [
    {
      id: 'A11111111',
      title: 'First Title',
      content: 'First Content from server'
    },
    {
      id: 'B22222222',
      title: 'Second Title',
      content: 'Second Content from server'
    }
  ];
  res
    .status(200)
    .json({
      message: 'Post fetched Successfully !',
      posts: posts
    });
});

module.exports = app;
