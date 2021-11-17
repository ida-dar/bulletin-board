const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' })
      .select('author created title photo')
      .sort({ created: -1 });
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

// router.get('/posts/:id/edit', async (req, res) => {
//   try {
//     const {author, title, text, status, photo, price, phone, location, created} = req.body;
//     const result = await Post.findById(req.params.id);
//     const currentDate = new Date().toISOString();

//     if(result) {
//       result.author = author;
//       result.title = title;
//       result.created = created;
//       result.updated = currentDate;
//       result.status = status;
//       result.text = text;
//       result.photo = photo;
//       result.price = price;
//       result.phone = phone;
//       result.location = location;

//       await result.save();
//       res.json(result);
//     }
//     else res.status(404).json({ post: 'Not found...' });
//   }
//   catch(err) {
//     res.status(500).json(err);
//   }
// });

router.post('/posts/add', async (req, res) => {
  try {
    const {author, title, text, status, photo, price, phone, location} = req.body;

    if(author && title.length > 10 && text.length > 20){
      const currentDate = new Date().toISOString();

      const newPost = new Post({
        author: author,
        title: title,
        created: currentDate,
        updated: currentDate,
        status: status,
        text: text,
        photo: photo,
        price: price,
        phone: phone,
        location: location,
      });

      await newPost.save();
      if (!newPost) res.status(404).json({ post: 'Not found' });
      else res.json(newPost);
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
