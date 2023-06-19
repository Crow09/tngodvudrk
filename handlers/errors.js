const pool = require('./_DBpool');

const notFound = (req, res) => {
  res.render('errors/404.html');
}

module.exports = {
  notFound,
}