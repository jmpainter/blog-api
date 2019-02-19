const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models/posts');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Author } = require('../models/authors');
router.get('/', (req, res) => {
  BlogPost.find()
    .then(posts => res.json(posts.map(post => post.serialize())))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/:id', (req, res) => {
  BlogPost.findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  const requiredFields = ['title', 'author', 'content'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const error = `${field} is required`;
      console.error(error);
      res.status(400).json({ message: error });
    }
  });
  let author;
  Author.findById(req.body.author)
    .then(_author => {
      if (!_author) {
        res.status(400).json({ message: 'Author not found ' });
      } else {
        author = _author;
      }
      return BlogPost.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
      });
    })
    .then(post => {
      res.status(201).json({
        id: post.id,
        author: author.firstName + ' ' + author.lastName,
        created: post.created,
        content: post.content
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
