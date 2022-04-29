const {ServerConfig} = require('API/config');

const app = require('./app.js')

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}.`);
});