const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/auth');

router.get('/signIn', authHandler.signIn);
router.post('/signInProcess', authHandler.signInProcess);
router.get('/signInProcess', (req,res)=>{ res.redirect('/')});
router.get('/signOut', authHandler.signOut);
router.get('/signUp', authHandler.signUp);
router.post('/signUpProcess', authHandler.signUpProcess);
router.get('/signUpProcess', (req,res)=>{ res.redirect('/')});

module.exports = router;