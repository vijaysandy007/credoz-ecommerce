const http = require("http");

 const app = require("./backend/app");

const loginReg = require("./backend/log");

 const server = http.createServer(app);

 const serverLog = http.createServer(loginReg)


 server.listen(3000,()=>{

    console.log("Succesfully learn nodejs");
 });

 serverLog.listen(4700,()=>{

   console.log("Created Login Server");

 })





 