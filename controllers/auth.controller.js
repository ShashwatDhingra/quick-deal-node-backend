const authServive = require('../services/auth.service')
const { sendResponse, getRequiredResponse, getInternalErrorResponse } = require('../utils/utils')

class AuthController{

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

        const response = await authServive.login(email, password)

        return sendResponse(res, response)
        }catch(e){
            return sendResponse(res, getInternalErrorResponse(e.message || "An error occurred"))
        }
    }

    // SIGNUP CONTROLLER
    async signup(req, res){
        
    }
}

module.exports = new AuthController()