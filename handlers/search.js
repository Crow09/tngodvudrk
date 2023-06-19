const pool = require('./_DBpool');

const post = (req, res) => {
  if (req.query.post) {
    let sql = `SELECT idPost, nick, title, postingDate FROM posts WHERE title LIKE '%${req.query.post}%'`;
    // let value = req.query.post;
    pool.query(sql, (err, rows, fields) => {
      if (err) throw err;
      console.log('rows',rows);
      res.render('post/postIndex.html', {user : req.session.user, posts : rows, href : 'post'});
    })
  }
  else if (req.query.user) {
    console.log(req.query.user);
    let sql = `SELECT id, nick, lastSignIn FROM users WHERE nick LIKE '%${req.query.user}%'`;
    // let value = req.query.post;
    pool.query(sql, (err, rows, fields) => {
      if (err) throw err;
      console.log('rows', rows);
      res.render('user/list.html', {user : req.session.user, list : rows, href : 'user'});
    })
  }
}



module.exports = {
  post,
}