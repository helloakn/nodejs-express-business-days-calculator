const {StatusCodes} = require('API/config');
const Validator = require('API/functions/validator');
// program base on aws lambda function style
exports.handler = async (event,callback) => {

    const formData = event.body;
    console.log('formData',formData);
    const v = await Validator.Rule(
        async validator=>{
            validator.input("brand_name",formData.brand_name)
            .isEmpty("Brand Name should not be empty");
        });
    return {
        statusCode: StatusCodes.Ok,
        body: {"hello":"world"}
    };
}