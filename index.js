// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

// open connection to a tcp line
client.connectTCP("192.168.100.60", { port: 502 });
client.setID(1);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.

var i=0;

setInterval(function() {
    client.readCoils(512, 50, function(err, data) {
        if(data && data.data && data.data.find(item => !!item)){
            console.dir(data.data.map(item => item?1:0).join(''));
        }
    });
}, 1000);
//
setTimeout(()=>{
    client.writeCoils(530, [true, true, true]).then(()=>{
       console.log(true)
});
}, 2000);


// setInterval(function() {
//     client.readDiscreteInputs(0, 100, function(err, data) {
//         if(data && data.data){
//             console.log(data.data.map(item => item?1:0).join(''));
//         }
//     });
// }, 1000);

// setTimeout(()=>{
//     client.writeRegister(71, true).then(()=>{
//        console.log(arguments)
// });
// }, 1000);

