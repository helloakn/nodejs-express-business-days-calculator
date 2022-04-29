// program base on aws lambda function style

const {StatusCodes} = require('API/config');
const Validator = require('API/functions/validator');
const {DateFunctions:DF} = require('API/functions/date');

exports.handler = async (event,callback) => {

    const formData = event.body;
    
    const validator = await Validator.Rule(
        async validator=>{

            await validator.input("start_date",formData.start_date)
            .isValidDateFormat("Input Format must be mm/dd/yyyy")
            .isValidDate("Start Date is incorrect, Please careful the leap years too");

            validator.input("end_date",formData.end_date)
            .isValidDateFormat("Input Format must be mm/dd/yyyy")
            .isValidDate("End Date is incorrect, Please careful the leap years too");

            validator.input('dates',null).customFunction(async v=>{
                if(DF.isValidDate(formData.start_date) && DF.isValidDate(formData.end_date)){
                    let diff = DF.dateDiff(formData.end_date,formData.start_date);
                    if(diff===0){
                        v.setError("Start Date and End Date must not be the same.");
                    }
                    else if(diff<1){
                        v.setError("End Date must be greater than Start Date ");
                    }
                    else if(diff==1){
                        v.setError("Interval of start date and end date must be at least 2");
                    }
                }
            });

        }
    );

    let isValidate = await validator.validate();
    if(isValidate){
        let diff = DF.dateDiff(formData.end_date,formData.start_date);
        let bdCount = 0;
        let minutes = 0;
        for(i = -2; i<diff;i++){

            bdCount++;
           
            let day = DF.addDay(formData.start_date,i);
            let isWeekend = DF.isWeekend(day);
            
            if(bdCount<=3){
                minutes ++;
            }
            else{
                if(isWeekend){
                    minutes++;
                }
            }
            
            if(DF.isPublicHoliday(day)){
                minutes++;
            }
            
        }
       
        return {
            statusCode: isValidate?StatusCodes.Ok:StatusCodes.BadRequest,
            body: isValidate?{"number_of_working_days:":(bdCount-minutes)}:validator.errors
        };

    }
    return {
        statusCode: isValidate?StatusCodes.Ok:StatusCodes.BadRequest,
        body: {"errors":validator.errors}
    };
}