const { google } = require('googleapis');
const { readFileSync } = require('fs');
var https = require('follow-redirects').https;
var fs = require('fs');

const utils = {
  log: function (message) {
    console.log(message);
  },

  /**
   * Sends a structured response to the client.
   * @param {object} res - Express response object.
   * @param {object} response - Response object.
   */
  sendResponse: function (res, response) {
    return res.status(response.statusCode).json(response);
  },

  /**
   * Generates a structured response object.
   * @param {number} statusCode - HTTP status code.
   * @param {boolean} success - Response success flag.
   * @param {string} message - Response message.
   * @param {object|null} data - Response data (optional).
   * @param {object|null} error - Error details (optional).
   * @returns {object} - Structured response object.
   */
  getResponse: function (
    statusCode = 500,
    success = false,
    message = "Something went wrong",
    data = null,
    error = null
  ) {
    const response = {
      statusCode,
      success,
      message,
      data: data || null,
      error: error || null,
    };

    // Log errors for debugging
    if (error) {
      utils.log(`Error: ${JSON.stringify(error)}`);
    }

    return response;
  },

  /**
   * Generates a response for missing required fields.
   * @param {string} field - Name of the missing field.
   * @returns {object} - Response object.
   */
  getRequiredResponse: function (field) {
    return {
      statusCode: 400,
      success: false,
      message: `Missing required field: ${field}`,
      data: null,
      error: `Missing required field: ${field}`,
    };
  },

  /**
   * Generates a response for internal server errors.
   * @param {string} err - Error message.
   * @returns {object} - Response object.
   */
  getInternalErrorResponse: function (err) {
    return {
      statusCode: 500,
      success: false,
      message: `__INTERNAL_ERROR: ${err}`,
      data: null,
      error: `__INTERNAL_ERROR: ${err}`,
    };
  },

  // Create 404 response object
  getNotFoundResponse: function (message = "Not Found") {
    return {
      statusCode: 404,
      success: false,
      message,
      data: null,
      error: message,
    };
  },

  // use for get cuurent time with add 5:30Minutes
  currentTime: function () {
    return new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  },

  hitNotification : async function (title, body, fcmToken, data){
    
    const accessToken = await this.getAccessToken();

    var options = {
      'method': 'POST',
      'hostname': 'fcm.googleapis.com',
      'path': '/v1/projects/quick-deal-90601/messages:send',
      'headers': {
        'Content-Type': ['application/json', 'application/json'],
        'Authorization': `Bearer ${accessToken}`
      },
      'maxRedirects': 20
    };
    
    var req = https.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    
      res.on("error", function (error) {
        console.error(error);
      });
    });
    
    var postData = JSON.stringify({
      "message": {
        "token": fcmToken,
        "notification": {
          "title": title,
          "body": body
        },
        "data": data
      }
    });
    
    req.write(postData);
    
    req.end();
  },

  getAccessToken: async function () {
    try {
        const SCOPES = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/firebase.database',
            'https://www.googleapis.com/auth/firebase.messaging'
        ];

        const jwtClient = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            null,
            process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            SCOPES
        );

        const tokens = await jwtClient.authorize();
        console.log("Server Key:", tokens.access_token);
        return tokens.access_token;
    } catch (error) {
        console.error("Error:", error);
        return "";
    }
}

};

module.exports = utils;
