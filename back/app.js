// imports
const express = require('express');

const userRoutes = require('./routes/user');

const postRoutes = require('./routes/post');

const commentRoutes = require('./routes/comment');

const path = require('path');

const { Sequelize } = require('sequelize');

//create app
const app = express();

app.use(express.json());


app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

//cors
app.use((req, res, next) => {
    res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });


  // routes 
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/auth', userRoutes);
  app.use('/api/auth', postRoutes);
  app.use('/api/auth', commentRoutes);

  // export 
  module.exports = app;