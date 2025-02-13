const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

// LOGIN ROUTE
router.post('/login', authController.login)

// SIGNUP ROUTE
router.post('/signup', authController.signup)

// CONFIRM MAIL ROUTE
router.post('/confirm-mail', authController.confirmMail)

// VERIFY CONFIRM MAIL PIN ROUTE
router.post('/verify-confirm-mail-pin', authController.verifyConfirmMailPin)

// FORGET PASSWORD ROUTE 
router.post('/forget-password', authController.forgetPassword)

// VERIFY RESET PIN
router.post('/verify-reset-pin', authController.verifyResetPin)

// RESET PASSWORD
router.post('/reset-password', authController.resetPassword)


module.exports = router