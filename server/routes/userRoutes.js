const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser, logoutUser } = require('../controllers/userController')
const { jwtCP, csrfP } = require('../middlewares/authMiddleware')

// localhost:9000/api/users/register

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', [jwtCP, csrfP], logoutUser)
router.get('/get', [jwtCP, csrfP], getUser)

module.exports = router