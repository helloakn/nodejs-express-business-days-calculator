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
        let  tf = false;
        for(i = -1; i<diff;i++){
            console.log('- - - - - - - - - -')
            bdCount++;
            if(bdCount<3){
                console.log('bdcount<3',bdCount)
                console.log('i',i);
                let current = DF.addDay(formData.start_date,i);
                console.log('bdcount<3 current',current)
                if(DF.isPublicHoliday(current)){
                    console.log('yes')
                    minutes += DF.isWeekend(current) ? -2 : -1;
                }
                else if(DF.isWeekend(current)){
                    minutes=minutes-1;
                    console.log('bdcount<3 ',bdCount,minutes)
                }
                else{
                    minutes--;
                }
                
                console.log('bdcount<3 minutes ',minutes)
            }
            else{
                let current = DF.addDay(formData.start_date,i);
                if(DF.isPublicHoliday(current)){
                    minutes += DF.isWeekend(current) ? -2 : -1;
                    tf = true;
                }
                else if(DF.isWeekend(current)){
                    minutes--
                }
            }
            
        }
        console.log('bdcoun end',bdCount)
        console.log('minutes end',minutes)
        bdCount = bdCount - 2;
        return {
            statusCode: isValidate?StatusCodes.Ok:StatusCodes.BadRequest,
            body: isValidate?{"number_of_working_days:":(bdCount+minutes)}:validator.errors
        };

    }
    return {
        statusCode: isValidate?StatusCodes.Ok:StatusCodes.BadRequest,
        body: isValidate?{"number_of_working_days:":12}:validator.errors
    };
}