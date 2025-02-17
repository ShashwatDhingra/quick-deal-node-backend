const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');


class AuthUtil {

    generateJWT(data){
        return jwt.sign(data, process.env.JWT_KEY);
    }

    async sendMail(to, subject, text) {

        const EMAIL = process.env.EMAIL;
        const PASS = process.env.PASS;

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASS
            }
        });

        // Configure email options
        const mailOptions = {
            from: 'QuickDeal',
            to,
            subject,
            text,
            inReplyTo: this.generateUniqueMessageId(),  // This'll make a new thread of new mail
            references: this.generateUniqueMessageId(), // This'll make a new thread of new mail
        };

        try {
            // Send email
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('error');
                    console.log(err.message);
                } else {
                    console.log(info.response)
                }
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw error; // Propagate the error to the caller
        }
    };


    /**
    * Generates a random 4-digit PIN code as a string.
    * @returns {string} The generated PIN code.
    */
    pinGenerator() {

        // Generate a random 4-digit PIN
        const pinCode = Math.floor(1000 + Math.random() * 9000);

        return pinCode.toString();
    };

    generateUniqueMessageId() {
        // Create a unique identifier, for example, using a timestamp
        const timestamp = new Date().getTime();
        const uniqueId = `${timestamp}quick-deal`;
        return uniqueId;
    };

    sendVerificationMail(email, code){
        return this.sendMail(email, 
'Your Verification Code for QuickDeal', `Hey New User !
                    
Thank you for signing up with QuickDeal ! 
Use the verification code below to complete your registration: 
            
🔢 Your OTP: ${code}
            
This code is valid for 1 minutes. Please do not share it with anyone.
            
If you didn't request this, please ignore this email.

Best regards,

            -- Quick Deal --
-- Property Deals made Easy. --`)
    }

    sendResetPasswordMail(email, name, code){
        return this.sendMail(email, 
'Reset your Password - QuickDeal', `Hey ${name}!

We received a request to reset your password for QuickDeal.
Use the verification code below to complete the process.
            
🔢 Your OTP: ${code}
            
This code is valid for 1 minutes. Please do not share it with anyone.
            
If you didn't request this, please ignore this email.

Best regards,

            -- Quick Deal --
-- Property Deals made Easy. --`)
    }
}

module.exports = new AuthUtil();