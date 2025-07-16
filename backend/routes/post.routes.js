const Router = require('express')
const router = new Router()
const postController = require('../controllers/post.controller')

router.post('/createPost', postController.createPost)
router.put('/posts', postController.editPost)
router.delete('posts/:id', postController.deletePost)
router.get('/posts', postController.getPosts)

module.exports = router