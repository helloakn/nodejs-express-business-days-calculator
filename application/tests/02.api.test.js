const request = require('supertest');
const app = require('../app.js')
const {ServerConfig,publicHolidays} = require('API/config');

jest.setTimeout(5000);

describe("API Testing", () => {

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

    describe("Route Check", () => {
        describe("404 page check", () => {
            test("Response code must be 404", async () => {
                const response = await request(server).post("/api/nopage")
                expect(response.statusCode).toBe(404)
            })
        });
        describe("Health Check", () => {
            test("Response code must be 200", async () => {
                const response = await request(server).post("/health/check")
                expect(response.statusCode).toBe(200)
            })
        });
        
    });

    describe("Business Days Api Testing", () => {
        it('calculate with 07/01/2022 and 07/31/2022', 
        function(done) {
            request(server).post("/api/businessday/calculate").send({
                start_date: "07/01/2022",
                end_date: "07/31/2022"
            })
            .expect('Content-Type', /json/)
            .expect(200,done);
        });//end it

        it('test end date is greater than start date is start_date:07/31/2022 end_date:07/01/2022', 
        function(done) {
            request(server).post("/api/businessday/calculate").send({
                start_date: "07/31/2022",
                end_date: "07/01/2022"
            })
            .expect('Content-Type', /json/)
            .expect(400,
                {
                    errors: {
                        dates: [
                            "End Date must be greater than Start Date "
                        ]
                    }
                },done
            )
            
            //.expect(400,done)
        }); // end it

        it('interval check between two dates', 
        function(done) {
            request(server).post("/api/businessday/calculate").send({
                start_date: "07/30/2022",
                end_date: "07/31/2022"
            })
            .expect('Content-Type', /json/)
            .expect(400,
                {
                    errors: {
                        dates: [
                            "Interval of start date and end date must be at least 2"
                        ]
                    }
                },done
            )
            
            //.expect(400,done)
        }); // end it
    });
    
});