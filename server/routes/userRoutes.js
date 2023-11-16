const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser, logoutUser, editProfile } = require('../controllers/userController')
const { jwtCP, csrfP } = require('../middlewares/authMiddleware')

// localhost:9000/api/users/
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/get', [jwtCP, csrfP], getUser)
router.post('/editProfile', [jwtCP, csrfP], editProfile)

module.exports = router