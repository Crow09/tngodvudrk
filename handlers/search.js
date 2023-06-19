const pool = require('./_DBpool');

const post = (req, res) => {
  let sql = `SELECT idPost, nick, title, postingDate FROM posts WHERE title LIKE '${req.query.post}'`
  // let value = req.query.post;
  pool.query(sql, (err, rows, fields) => {
    if (err) throw err;
    console.log('rows',rows);
    if (rows === undefined)
      res.redirect('/');
    else {
      res.render('post/postIndex.html', {user : req.session.user, posts : rows, href : 'post'});
    }
  })
}


module.exports = {
  post,
}