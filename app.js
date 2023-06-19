const express = require('express');
const session = require('express-session');
const sessionConfig = require('./config/session');
const nunjucks = require('nunjucks');
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const searchRouter = require('./routes/searchRouter');
const errorsRouter = require('./routes/errorsRouter');
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(session(sessionConfig))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {res.render('index.html', {user : req.session.user, index : true, href : "post"});})
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/search', searchRouter);
app.use('/errors', errorsRouter);

app.listen(3000);