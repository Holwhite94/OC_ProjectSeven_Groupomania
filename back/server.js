
const http = require('http'); 
const app = require('./app'); 

// set port
app.set('port', process.env.PORT || 5000);
// create server
const server = http.createServer(app);
// tell server to listen on port set
server.listen(process.env.PORT || 5000);