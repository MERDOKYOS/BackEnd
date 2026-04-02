// here is solution for having the same name in one file but different functionality 

// (function require() {
//   let  x=()=>{
//     console.log("merde in the building");
//   }
// })();
// let  x=()=>{
//   console.log("su in the building");
// }
// x();
// x();

// commen os methods
// let os =require("os");
// let  homedir= os.networkInterfaces();
// console.log(homedir);


// reading file
let fs = require("fs");
// fs.readFile("./ab.txt","utf-8",(err,data)=>{
//   if(err){
//     console.error(err)
//   }
//   else 
//     console.log(data)
// });

// reading folder
fs.readdir("./Common",(err,data)=>{
  if(err){
    console.error(err);
  }
  else
    console.log(data)
});

// this two give us directory and file name to currrent file
// console.log(__filename);
// console.log(__dirname);

// here we import path module and use parse method to get more info about the file.
// let path =  require("path")
// let file = path.parse(__filename);
// console.log(file);


// calculating used memory
// let totalmem = os.totalmem();
// let freemem = os.freemem();
// let usedmem = (totalmem - freemem) / (1024 * 1024 * 1024);
// console.log("freememory: ",freemem);
// console.log("totalmemory: ",totalmem);
// console.log("usedmemory: ",usedmem);




