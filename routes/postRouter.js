const express = require('express');
const router = express.Router();
const postHandler = require('../handlers/post');

router.get('/', postHandler.post);
router.get('/posting', postHandler.posting);
router.get('/:postId', postHandler.postDetail);
router.post('/postingProcess', postHandler.postingProcess);
router.post('/commentProcess', postHandler.commentProcess);
router.get('/:postId/postDelete', postHandler.postDelete);
router.get('/:commentId/commentDelete', postHandler.commentDelete);
router.get('/:postId/postEdit', postHandler.postEdit);
router.post('/:postId/postEditProcess', postHandler.postEditProcess);
router.post('/:commentId/commentEditProcess', postHandler.commentEditProcess);

module.exports = router;