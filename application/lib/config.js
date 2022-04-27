require('dotenv').config();
module.exports = { 
    ServerConfig:{
        POR:process.env.SVR_PORT || 8080
    },
    StatusCodes:{
        Ok:200,
        Created:201,
        Accepted:202,
        NoContent:204,
        BadRequest:400,
        UnAuthorize:401,
        Forbidden:403,
        NotFound:404,
        NotAcceptable:406,
        UnSupportedMediaType:415,
        UpgradeRequired:426,
        TooManyRequests:429
    }
};