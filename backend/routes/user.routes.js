const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getOneUser)
router.put('/users', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router