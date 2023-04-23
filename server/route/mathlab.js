const express = require('express');

const router = express.Router();
const {
    getAllPosts,
    postPost,
    deleteSinglePost,
    getSinglePost,
    UpdateSinglePost
} = require('../controllers/index')

router.route('/')
    .get(getAllPosts)
    .post(postPost);

router.route('/:id')
    .delete(deleteSinglePost)
    .get(getSinglePost)
    .put(UpdateSinglePost)



module.exports = router



