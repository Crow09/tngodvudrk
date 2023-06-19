const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/user');

router.get('/list', userHandler.list)
router.get('/myPage', userHandler.myPage)
router.post('/update', userHandler.update)
router.get('/update', (req, res)=>{ res.render('message.html', {msg:'로그인하세요', user : req.session.user})})
router.post('/withdrawal', userHandler.withdrawal)
router.get('/withdrawal', (req, res)=>{ res.render('message.html', {msg:'로그인하세요', user : req.session.user})});

module.exports = router;