module.exports = app => {
    let serviceList = [];
    
    serviceList.push(
        { 
            prefix:'api',
            service: require("./bd-calculator.routes.js")
        },
        { 
            prefix:'',
            service: require("./healthcheck.routes.js")
        }
    );

   require('API/routeGenerator')(app,serviceList);
}