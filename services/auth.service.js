const userModel = require('../models/user.model');
const { sendResponse, getResponse } = require('../utils/utils');

class AuthService{

    // LOGIN API
    async login(email, password) {
        try {
            // check if user exist or not
            const user = await userModel.findOne({ email });

            if (!user) {
                return getResponse(404, false, 'User doesnt exists with this email id', null, 'User doesnt exists with this email id')
            }

            // decrypt the password and compare the entered password with the hashed password stored in the database
            const isPassValid = await bcrypt.compare(password, user.password);

            // if true - means password matches
            if (!isPassValid) {
                return getResponse(401, false, 'Wrong password buddy! Cross check it', null, 'Wrong password buddy! Cross check it')
            }

            // Generate a JWT Token
            const token = utils.generateJWT(user.username, user.email);

            return getResponse(200, true, 'Login Successfully', user)
        } catch (e) {
            console.log(e);
            return getResponse(403, false, 'Error', null, e.message)
        }
    }


    // SIGNUP API
    async signup(){
        
    }

}

module.exports = new AuthService()