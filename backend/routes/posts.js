const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let response = await db.query(
      'SELECT p.title, p.body, p.id, p.likes, c.id as comments_id, c.text from posts p FULL OUTER JOIN comments c ON p.id=c.post_id ORDER BY p.id'
    );

    if (response.rows.length === 0) {
      return res.status(200).json(response.rows);
    } else {
      let previousId = response.rows[0].id;
      let results = response.rows.reduce((all, item, idx) => {
        if (all.length === 0) {
          all.push({
            id: item.id,
            title: item.title,
            body: item.body,
            likes: item.likes,
            comments: [{ comment_id: item.comments_id, text: item.text }]
          });
          return all;
        } else {
          if (item.id === previousId) {
            all[all.length - 1].comments.push({
              comment_id: item.comments_id,
              text: item.text
            });
            return all;
          } else {
            previousId = item.id;
            all.push({
              id: item.id,
              title: item.title,
              body: item.body,
              likes: item.likes,
              comments: item.comments_id
                ? [{ comment_id: item.comments_id, text: item.text }]
                : []
            });
            return all;
          }
        }
      }, []);
      return res.status(200).json(results);
    }
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const results = await db.query(
      'INSERT INTO posts (title,body) VALUES ($1,$2) RETURNING *',
      [req.body.title, req.body.body]
    );
    return res.status(201).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE posts SET title=$1,body=$2 WHERE id=$3 RETURNING *',
      [req.body.title, req.body.body, req.params.id]
    );
    return res.status(200).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id/like', async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE posts SET likes=likes+1 WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    return res.status(200).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id/dislike', async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE posts SET likes=likes-1 WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    return res.status(200).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const results = await db.query('DELETE FROM posts WHERE id=$1', [
      req.params.id
    ]);
    return res.status(200).json({ message: 'Post deleted' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
