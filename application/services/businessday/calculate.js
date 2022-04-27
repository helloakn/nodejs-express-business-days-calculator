const {StatusCodes} = require('API/config');
// program is aws lambda function style
exports.handler = async (event,callback) => {
    return {
        statusCode: StatusCodes.Ok,
        body: {"hello":"world"}
    };
}