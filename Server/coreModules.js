// fs = about file system
// os = about operating systems
// path = about dealing paths
// http = about creating servers
// events = about handling events and listening

// this the above are the main core modules (built in modules)

// /* */ os module

// let os = require("os");
// let freeMe = os.freemem();
// console.log(freeMe / (1024 * 1024 * 1024));

// let totalMe = os.totalmem();
// console.log(totalMe / (1024 * 1024 * 1024));

// let platform = os.platform();
// console.log(platform);

// let host = os.hostname();
// console.log(host);

// let userInfo = os.userInfo();
// console.log(userInfo);

//* */ fs module

// let fs = require("node:fs/promises");
// async function createFile() {
//   try {
//     await fs.writeFile("message.txt", "Hello from node");
//     console.log("file created succesfully");
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function readFiles() {
//   try {
//     let data = await fs.readFile("message.txt", "utf-8");
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// (async () => {
//   await createFile();
//   await readFiles();
// })(); //Immediately invoked function expression(IIFE)

//* */ events module

// const eventEmmiter = require("events");
// const emmiter = new eventEmmiter();

// emmiter.on("userLogin", (user) => {
//   console.log(`${user} logged in`);
// });

// emmiter.emit("userLogin", "merde");

// /* */ http module

// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.end("home page");
//   } else if (req.url === "/about") {
//     res.end("about page");
//   } else if (req.url === "/contact") {
//     res.end("contact page");
//   } else {
//     res.end("404 not found");
//   }

//   console.log("request recieved");
// });

// server.listen(5000, () => {
//   console.log("server running on 5000 port");
// });

// here below one is full static web server

const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     fs.readFile("index.html", (err, data) => {
//       if (err) {
//           res.writeHead(500);
//           return res.end("Error loading page");
//         }

//       res.writeHead(200, {
//         "content-type": "text/html",
//       });
//       res.end(data);
//     });
//   }
//   else{
//     res.writeHead(404,{
//       "content-type":"text/plain",
//     })
//     res.end("page not found");
//   }
// });

// server.listen(3000,()=>{
//   console.log("Server running on port number 3000")
// });

// another way to create static web server

// const server2 = http.createServer((req, res) => {
//   let parsedURL = url.parse(req.url, true);
//   let filePath = parsedURL.path;

//   if (filePath === "/index.html") {
//     let requestedFile = __dirname + filePath;
//     fs.readFile(requestedFile, (err, data) => {
//       if (err) {
//         res.writeHead(404);
//         res.end("page not found");
//       } else {
//         res.writeHead(200, { "content-type": "text/html" });
//         res.end(data);
//       }
//     });
//   } else {
//     res.writeHead(500, { "content-type": "text/plain" });
//     res.end();
//   }
// });

// server2.listen(3000, () => {
//   console.log("server running");
// });

// /* here i apply those methods to get the apple website on my server */

// const mimeType = require("mimetype");
// const path = require("path");
// const server3 = http.createServer((req, res) => {
//   let filePath = req.url;

//   if (filePath === "/") {
//     filePath = "index.html";
//   }

//   let requestedFile = path.join(__dirname, "apple", filePath);
//   let mimeLookUp = mimeType.lookup(requestedFile);

//   fs.readFile(requestedFile, (err, content) => {
//     if (err) {
//       res.writeHead(404);
//       res.end();
//     } else {
//       res.writeHead(200, { "content-type": mimeLookUp });
//       res.end(content);
//     }
//   });
// });

// server3.listen(3000);

// simpler version using express module

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "apple")));

app.get("/", (err, data) => {
  res.sendFile(path.join(__dirname, "apple", "index.html"));
});

app.use((req, res) => {
  res.status(400).send("Page Not Found");
});

app.get("*", () => {
  res.sendFile(path.join(__dirname, "apple", "notFound.html"));
});

app.listen(3000, () => {
  console.log("server running");
});
