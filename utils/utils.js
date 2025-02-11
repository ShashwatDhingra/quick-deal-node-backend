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
    getResponse: function (statusCode = 500, success = false, message = "Something went wrong", data = null, error = null) {
        const response = {
            statusCode,
            success,
            message,
            data: data || null,
            error: error || null
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
            error: `Missing required field: ${field}`
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
    }
};

module.exports = utils;
