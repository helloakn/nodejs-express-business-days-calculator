const request = require('supertest');
const app = require('../app.js')
const {ServerConfig,publicHolidays} = require('API/config');

//for unit Testing
const {DateFunctions:DF} = require('API/functions/date');
const {
    isValidDate,
    dateDiff,
    getDayNumber,
    isPublicHoliday,
    isWeekend
} = DF;
//end for unit Testing

describe("Unit Testing", () => {
    let server;

    let start_date;
    let end_date;
    

    beforeAll(done => {

        start_date = "07/01/2022";
        end_date = "07/31/2022";

        

        server = app.listen(ServerConfig.PORT, () => {
            console.log(`Server is running on port ${ServerConfig.PORT}.`);
        });

        done()
    })

    afterAll(done => {
        // terminate the app.
        server.close()
        done()
    })


    describe("Date Functions", () => {

        describe("isValidDate : Date Format mm/dd/yyyy", () => {
            test(`should not be unvalid asdfasdfadf`, () => {
                expect(isValidDate('asdfasdfadf')).toBe(false);
            });
            test(`incorrect format 2022/02/02 is false`, () => {
                expect(isValidDate('2022/02/02')).toBe(false);
            });
            test(`correct format 02/02/2022 is true`, () => {
                expect(isValidDate('02/02/2022')).toBe(true);
            });
        });

        describe("dateDiff : Date Different function ", () => {
            test(`must be interval of end and start date`, () => {
                expect(dateDiff(end_date,start_date)).toBe(30);
            });
        });

        describe("getDayNumber : count from sunday (0) to saturday(6) ", () => {
            test(`must be within 0 and 6`, () => {
                expect(getDayNumber('07/01/2022')).toBe(5);
                expect(getDayNumber('07/02/2022')).toBe(6);
                expect(getDayNumber('07/03/2022')).toBe(0);
                expect(getDayNumber('07/04/2022')).toBe(1);
                expect(getDayNumber('07/05/2022')).toBe(2);
                expect(getDayNumber('07/06/2022')).toBe(3);
                expect(getDayNumber('07/07/2022')).toBe(4);
                expect(getDayNumber('07/08/2022')).toBe(5);
                expect(getDayNumber('07/09/2022')).toBe(6);
                

            });
        });

        describe("isPublicHoliday : Must Be True For any years ", () => {
            let random_years = [2019,2016,2018,2022,2025];
            random_years.forEach(y=>{
                publicHolidays.forEach(holiday=>{
                    test(`${holiday.name} must be true on Random Year ${y}`, () => {
                        expect(isPublicHoliday(`${holiday.on}/${y}`)).toBe(true);
                    });
                });
            });
        });
        describe("isPublicHoliday : Must Be False For any years on second december (12/02/yyyy)", () => {
            let random_years = [2019,2016,2018,2022,2025];
            random_years.forEach(y=>{
                publicHolidays.forEach(holiday=>{
                    test(`holiday check 12/02 (second december) must be false on Random Year ${y}`, () => {
                        expect(isPublicHoliday(`12/02/${y}`)).toBe(false);
                    });
                });
            });
        });

        describe("isWeekend : Checking weekend days", () => {
            test(`if weekend must be true, or false`, () => {
                expect(isWeekend('07/01/2022')).toBe(false);
                expect(isWeekend('07/02/2022')).toBe(true);
                expect(isWeekend('07/03/2022')).toBe(true);
                expect(isWeekend('07/04/2022')).toBe(false);
                expect(isWeekend('07/05/2022')).toBe(false);
                expect(isWeekend('07/06/2022')).toBe(false);
                expect(isWeekend('07/07/2022')).toBe(false);
                expect(isWeekend('07/08/2022')).toBe(false);
                expect(isWeekend('07/09/2022')).toBe(true);
                

            });
        });

    });
});
