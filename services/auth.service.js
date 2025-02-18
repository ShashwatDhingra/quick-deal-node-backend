const userModel = require('../models/user.model');
const emailVerificationModel = require('../models/emailVerification.model')
const { getResponse, log, getInternalErrorResponse } = require('../utils/utils');
const authUtils = require('../utils/auth.utils');
const bcrypt = require('bcrypt')

class AuthService{

    // ---- SIGNUP AUTH SERVICES STARTED----

    // CONFIRM MAIL SERVICE
    async confirmMail(email){
        try{
            let isUser = await userModel.findOne({email});

            if(isUser){
                return getResponse(400, false, 'User already exists with this email id', null, 'User already exists with this email id')
            }

            let user = await emailVerificationModel.findOne({ email });

            const generatePin = authUtils.pinGenerator();

            if(!user){
                // Make new emailVerification data for new user is don't exists.
                user = new emailVerificationModel({
                    email,
                    pin: generatePin,
                    expiration: Date.now() + 60000 // PIN valid for 1 minute
                })
            } else {
                user.pin = generatePin;
                user.expiration = Date.now() + 60000
            }

            const saveUserRes = await user.save()

            if(saveUserRes){
                const result = authUtils.sendVerificationMail(email, generatePin)

                if(result){
                    return getResponse(200, true, 'PIN send to mail successfully', null);
                }else{
                    return getResponse(500, false, 'Error in sending PIN ', null, 'Error in sending PIN ');
                }
            }else{
                return getResponse(500, false, 'Something went wrong! Try again later', null, 'Something went wrong! Try again later');
            }
        }catch(e){
            log(e.message)
            return getInternalErrorResponse(e.message || "An error occurred")
        }
    }

    // VERIFY CONFIRM MAIL PIN SERVICE
    async verifyConfirmMailPin(email, pin) {
        try {
            const user = await emailVerificationModel.findOne({ email });

            if (!user) {
                return getResponse(401, false, "Please request for Otp first.", null, "User doesn't exist")
            }

            if (pin != user.pin) {
                return getResponse(401, false, "PIN doesn't match", null, "PIN doesn't match")
            }

            const expirationCheck = user.expiration - Date.now();
            if (expirationCheck < 0) {
                return getResponse(419, false, "PIN got expired", null, "PIN got expired")
            } else {
                await emailVerificationModel.deleteOne( {email} )
                return getResponse(200, true, "Proceed for Signup")
            }
        } catch(e){
            log(e.message)
            return getInternalErrorResponse(e.message || "An error occurred")
        }
    }

    // SIGNUP SERVICE
    async signup(name, email, password){
        try{
            // Check if the user already exists
            const existingUser = await userModel.findOne({email});

            if(existingUser){
                return getResponse(409, false, "Email already exists", null, "Email already exists");
            }

             // Create a new user instance
             const user = new userModel({ name, email, password });

             // Save the user to the database
             const result = await user.save();
 
             // Generate a JWT Token
             const token = authUtils.generateJWT({'name': user.name, 'email': user.email, 'role': user.role});
 
             if (result && token) {
                 console.log('--- accounted created ---');
                 return getResponse(201, true, "Account Created Successfully", {"token": token})
             }

             return getResponse(500, false, 'Something went wrong', null, 'Something went wrong')

        }catch(e){
            console.error(e);
            return getInternalErrorResponse(e.message || "Internal Error")
        }
    }

    // ---- SIGNUP AUTH SERVICES COMPLETED----


    // LOGIN SERVICE
    async login(email, password) {
        try {
            // check if user exist or not
            const user = await userModel.findOne({ email });

            if (!user) {
                return getResponse(401, false, 'User doesnt exists with this email id', null, 'User doesnt exists with this email id')
            }

            // decrypt the password and compare the entered password with the hashed password stored in the database
            const isPassValid = await bcrypt.compare(password, user.password);

            // if true - means password matches
            if (!isPassValid) {
                return getResponse(401, false, 'Wrong password buddy! Cross check it', null, 'Wrong password buddy! Cross check it')
            }

            // Generate a JWT Token
            const token = authUtils.generateJWT({'name': user.name, 'email': user.email, 'role': user.role});

            return getResponse(200, true, 'Login Successfully', {"token" : token})
        } catch (e) {
            console.log(e);
            return getResponse(403, false, 'Error', null, e.message)
        }
    }


    // FORGET PASSWORD SERVICE 
    async forgetPassword(email) {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return getResponse(401, false, 'User doesnt exists with this email id', null, 'User doesnt exists with this email id')
            }

            const generatePin = authUtils.pinGenerator();

            user.resetPin = generatePin;
            user.resetPinExpiration = Date.now() + 60000;  // PIN valid for 1 minutes
            await user.save();

            const result = authUtils.sendResetPasswordMail(email, user.name, generatePin)

            if (result) {
                return getResponse(200, true, "Please check your mail id")
            } else {
                return getResponse(500, false, "Somehting went wrong", null, "Something went wrong")
            }

        } catch (e) {
           return getInternalErrorResponse(e.message || "Internal Error")
        }
    }
    
    // VEEIFY RESET PIN SERVICE
    async verifyResetPin(email, pin) {
        try{
            let user = await userModel.findOne({ email });
            
            if (!user) {
                return getResponse(401, false, 'User doesnt exists with this email id', null, 'User doesnt exists with this email id')
            }
            
            const isValid = await userModel.findOne({ email, resetPin: pin, resetPinExpiration: { $gt: Date.now() } })  // another way to verify the pin weather it expire, using $gt i.e. query operator
            
            if (!isValid) {
                return getResponse(401, false, "Invalid or expired PIN", null, "Invalid or expired PIN")
            }
            
            return getResponse(200, true, "Please set the new Password")
        }catch(e){
            return getInternalErrorResponse(e.message || "Internal Error")
        }
    }

    // RESET PASSWORD
    async resetPassword(email, password) {
        try{
            const user = await userModel.findOne({ email });

            if (!user) {
                return getResponse(401, false, 'User doesnt exists with this email id', null, 'User doesnt exists with this email id')
            }
    
            user.password = password;
            user.resetPin = null;
            user.resetPinExpiration = null;
            const isSaved = await user.save();
    
            if (!isSaved) {
                return getResponse(400, false, "Something went wrong! Try again")
            } 
            
            return getResponse(200, true, "Password Changed Successfully")
        }catch(e){
            return getInternalErrorResponse(e.message || "Internal Error")
        }
    }
}

module.exports = new AuthService()
