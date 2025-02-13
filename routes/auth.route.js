const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

// LOGIN ROUTE
router.post('/login', authController.login)

// SIGNUP ROUTE
router.post('/signup', authController.signup)

// CONFIRM MAIL
router.post('/confirm-mail', authController.confirmMail)

// VERIFY CONFIRM MAIL PIN
router.post('/verify-confirm-mail-pin', authController.verifyConfirmMailPin)

// Forget Password Route - Send PIN to user mail id
// router.post('/forget-password', authController.forgetPassword)

module.exports = router