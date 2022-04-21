const http = require("http");

const loging = require("./backend/log")

const server1 = http.createServer(loging);


server1.listen(4000,()=>{
    console.log("ok");
 });