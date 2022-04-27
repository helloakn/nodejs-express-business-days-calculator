module.exports = app => {
    let serviceList = [];
    
    serviceList.push(
        { 
            prefix:'businessday',
            service: require("./bd-calculator.routes.js")
        },
        { 
            prefix:'health',
            service: require("./healthcheck.routes.js")
        }
    );

   require('API/routeGenerator')(app,serviceList);
}