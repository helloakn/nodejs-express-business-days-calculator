require('dotenv').config();
module.exports = { 
    ServerConfig:{
        PORT:process.env.PORT || 8080,
        allowFrom:process.env.allowFrom || "*"
    },
    Path:{
        services: '../'
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
    },
    publicHolidays: [
        // on : mm/dd
        {on:"01/01" , name:"New Year", },
        {on:"01/26" , name:"Australia Day" },
        {on:"03/08" , name:"Canberra Day"},
        {on:"04/02" , name:"Good Friday"},
        {on:"04/03" , name:"Easter Saturday"},
        {on:"04/04" , name:"Easter Sunday"},
        {on:"04/05" , name:"Easter Monday"},
        {on:"04/25" , name:"Anzac Day"},
        {on:"05/31" , name:"Reconciliation Day"},
        {on:"10/04" , name:"Labour Day"},
        {on:"12/25" , name:"Christmas Day"}
    ],
    addOn: [
        // on : mm/dd
        {on:"01/01" , name:"New Year", },
        {on:"01/26" , name:"Australia Day" },
        {on:"03/08" , name:"Canberra Day"},
        {on:"04/02" , name:"Good Friday"},
        {on:"04/03" , name:"Easter Saturday"},
        {on:"04/04" , name:"Easter Sunday"},
        {on:"04/05" , name:"Easter Monday"},
        {on:"04/25" , name:"Anzac Day"},
        {on:"05/31" , name:"Reconciliation Day"},
        {on:"10/04" , name:"Labour Day"},
        {on:"12/25" , name:"Christmas Day"}
    ]
};