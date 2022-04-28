const {publicHolidays} = require('API/config');

const DateFunctions = {
    isValidDate:_d=>{
        let dArray = _d.split("/");
        if(dArray.length!=3) return false;
        if(dArray[0].length>2 || dArray[1].length>2 || dArray[2].length>4) return false;
        if(isNaN(dArray[0]) || isNaN(dArray[1]) || isNaN(dArray[2])) return false;
        if(_d.indexOf("-") != -1 ) return false;
        return true;
    },
    dateDiff:(_start_date,_end_date)=>{
        _start_date = _start_date instanceof Date || new Date(_start_date);
        _end_date = _end_date instanceof Date || new Date(_end_date);
        let diff = _start_date.getTime() - _end_date.getTime();  
        return diff / (1000 * 60 * 60 * 24); 
    },
    getDayNumber:(_d)=>{
        return (_d instanceof Date || new Date(_d)).getDay() 
    },
    getTime:_d=>{
        _d = _d instanceof Date || new Date(_d);
        return _d.getTime();
    },
    isPublicHoliday:_d=>{
       // console.log('d',_d);
        _d = _d instanceof Date || new Date(_d);
        //console.log('x',_d);
        let  tf = false;
        publicHolidays.forEach(holiday=>{
            //console.log('_d.getFullYear()',_d.getFullYear())
            let tmpHoliday = holiday.on + "/" + _d.getFullYear();
            let h = new Date(tmpHoliday);
           // console.log('is equal ',h.getTime(),_d.getTime())
            if(!tf){
                tf = h.getTime() === _d.getTime();
            }
            
        });       
        return tf;
    },
    isWeekend:_d=>{
        _d = _d instanceof Date || new Date(_d);
        var dayNumber = _d.getDay();
        //console.log('dayNumber',dayNumber)
        return (dayNumber === 6) || (dayNumber  === 0); // 6 = Saturday, 0 = Sunday
    },
    addDay:(_d,_count)=>{
        _d = _d instanceof Date || new Date(_d);
        return (new Date(_d.getTime()+(_count*86400000)))
            .toLocaleDateString();
    }
}

module.exports  = {
    DateFunctions
};