const authService = require('../services/auth.service')
const { sendResponse, getRequiredResponse, getInternalErrorResponse, getResponse } = require('../utils/utils')

class AuthController{

    // ---- SIGNUP AUTH FUNCTIONS STARTED----

    // CONFIRM MAIL CONTROLLER
    async confirmMail(req, res){
        try{
        const { email } = req.body;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return sendResponse(res, getResponse(400, false, 'Invalid Email Address', null, 'Invalid email Address'))
        }

        const response = await authService.confirmMail(email)

        return sendResponse(res, response)

        } catch(e){
            return sendResponse(res, getInternalErrorResponse(e.message || "An error occurred"))
        }
    }

    // VERIFY CONFIRM MAIL PIN CONTROLLER
    async verifyConfirmMailPin(req, res) {
        try{
            const { email, pin } = req.body;

            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                return sendResponse(res, getResponse(400, false, 'Invalid Email Address', null, 'Invalid email Address'))
            }

            if(!pin){
                return sendResponse(res, getRequiredResponse('pin'))
            }

            const response = await authService.verifyConfirmMailPin(email, pin);

            return sendResponse(res, response)
        } catch(e){
            return sendResponse(res, getInternalErrorResponse(e.message || "An error occured"))
        }
    }

    // SIGNUP CONTROLLER
    async signup(req, res){
        try{
        const { name, email, password } = req.body;

        // Check if field is null
        if (!name) {
            return sendResponse(res, getRequiredResponse('name'))
        } else if (!email) {
            return sendResponse(res, getRequiredResponse('email'))
        } else if (!password) {
            return sendResponse(res, getRequiredResponse('password'))
        }

        const response = await authService.signup(name, email, password);

        return sendResponse(res, response);

    } catch(e){
        return sendResponse(res, getInternalErrorResponse(e.message || "An error occured"))
    }
    }

    // ---- SIGNUP AUTH FUNCTIONS COMPLETED ----

    // LOGIN CONTROLLER
    async login(req, res){
        try{
            const {email, password} = req.body;

            // -- USING GUARD CALUSE -- //

        // Check if the required value is null
        if(!email){
            return sendResponse(res, getRequiredResponse('email'))
        }

        if(!password){
            return sendResponse(res, getRequiredResponse('password'))
        }

        const response = await authService.login(email, password)

        return sendResponse(res, response)
        }catch(e){
            return sendResponse(res, getInternalErrorResponse(e.message || "An error occurred"))
        }
    }
    
    
    // FORGET PASSWORD CONTROLLER
    async forgetPassword(req, res){
        try{
            const { email } = req.body;

            if(!email){
                return sendResponse(res, getRequiredResponse('email'))
            }
            
            const response = await authService.forgetPassword(email);

            return sendResponse(res, response)
        }catch(e){
            return sendResponse(res, getInternalErrorResponse(e.message || "An error occurred"))
        }
    }
    
    // VERIFY RESET PIN CONTROLLER
    async verifyResetPin(req, res){
        try{
            const { email, pin } = req.body;
            
            if(!email){
                return sendResponse(res, getRequiredResponse('email'))
            }
            
            if(!pin){
                return sendResponse(res, getRequiredResponse('pin'))
            }
            
            const response = await authService.verifyResetPin(email, pin);
            
            return sendResponse(res, response)
        }catch(e){
            return sendResponse(res, getInternalErrorResponse(e.message || "An error occurred"))
        }
    }
    
    // RESET PASSWORD CONTROLLER
    async resetPassword(req, res) {
        try{
            const {email, password} = req.body;
            
            if(!email){
                return sendResponse(res, getRequiredResponse('email'))
            }
            
            if(!password){
                return sendResponse(res, getRequiredResponse('password'))
            }
            
            const response = await authService.resetPassword(email, password);
            
            return sendResponse(res, response)
            
        }catch(e){
            return sendResponse(res, getInternalErrorResponse(e.message || "An error occurred"))
        }

    }

}

module.exports = new AuthController()