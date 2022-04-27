const {StatusCodes} = require('API/config');
const Validator = require('API/functions/validator');
// program base on aws lambda function style
exports.handler = async (event,callback) => {

    const formData = event.body;
    console.log('formData',formData);
    const validator = await Validator.Rule(
        async validator=>{
            validator.input("brand_name",formData.brand_name)
            .isDate("validate date");
        });
    let isValidate = await validator.validate();
    console.log('isValidate',isValidate)
    console.log('validator',validator)
    return {
        statusCode: StatusCodes.Ok,
        body: {"hello":"world"}
    };
}