const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

// LOGIN ROUTE
router.post('/login', authController.login)

// Signup Route
router.post('/signup', authController.signup)

// Confirm Mail Route
// router.post('/confirm-mail', authController.confirmMail)

// Forget Password Route - Send PIN to user mail id
// router.post('/forget-password', authController.forgetPassword)

module.exports = router