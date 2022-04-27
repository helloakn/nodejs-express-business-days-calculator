
const {StatusCodes} = require('API/config');

module.exports =  (_app,_serviceList) => {
   
    middleware =(_authorizer,)=>{
        return async(req, res, next)=> {
             req.service = serviceName;
             if(_authorizer==undefined){
                 console.log('ok')
                 return next();
             }
             else{
                res.status(response.statusCode||StatusCodes.ok).send(response.body||{});
             }
             
         }
    }

    handler = async (req, res)=>{
       // console.log(req.body);
        const serviePath = "../services/"+req.service + ".js";
        const controller = require(serviePath);
        const response = await controller.handler(req);

        res.set(response.headers||{
            "Content-Type": "application/json",
            "X-Powered-By": "sat su tal nor"
        });

        res.status(response.statusCode||StatusCodes.ok).send(response.body||{});
    }

    generate = (_app,_serviceList) => {
        _serviceList.forEach(route=>{
            
            let service = route.service;
            service.functionList.forEach(fun=>{
                let routePrefix = `/${route.prefix}/${service.name}`;
                _app.prefix(routePrefix, function (router) {
                    console.log(routePrefix+"/"+fun.endPoint)
                    router.route("/"+fun.endPoint).post(
                        middleware(fun.authorizer),
                        handler
                    );
                });
            });

        });
        // _serviceList.forEach((service)=>{
        //     _app.prefix(`/${service}/${service.name}`, function (router) {
        
        //       service.functions.forEach((funObj)=>{
        
        //         router.route("/"+funObj.endPoint).post(
        //           middleware(funObj.authorizer),
        //           BridgeController.handler
        //         );
        
        //       }); // end endPoint
        
        //     });//end prefix
        // });
    }
  
    generate(_app,_serviceList);

  };