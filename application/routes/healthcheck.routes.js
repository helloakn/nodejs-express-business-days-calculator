const {StatusCodes} = require('API/config');
module.exports = {
    "name":"health",
    "functionList":[
        {
            "method": "get",
            "endPoint" : "check",
            "function":(res,req,next)=>{
                return {
                    statusCode: StatusCodes.Ok,
                    body:{}
                }
            },
            "authorization" : null
        }
    ]

}