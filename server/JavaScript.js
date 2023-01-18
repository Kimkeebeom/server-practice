// import os from "os";

// var output = "";
// for (var i = 0; i < 10; i++) {
// 	console.log((output += "*"));
// }

const os = require("os");
console.log(os.hostname());
console.log(os.type());
console.log(os.platform());
console.log(os.arch());
console.log(os.release());
console.log(os.uptime());
console.log(os.cpus());
