const mysql = require("mysql");
const express = require("express");

const app = express();

const connection = mysql.createConnection({
  user: "merde",
  password: "1234",
  host: "127.0.0.1",
  database: "merde",
});

app.listen(3001, () => {
  console.log("listennig");
});

connection.connect((err) => {
  if (err) console.log(err);
  else {
    console.log("connected");
  }
});

app.get("/install", (req, res) => {
  let createProduct = `CREATE TABLE Product (
    product_id INT AUTO_INCREMENT,
    product_name VARCHAR(255),
    product_url VARCHAR(250),
    PRIMARY KEY (product_id)
  );`;

  connection.query(createProduct, (err) => {
    if (err) {
      console.log(err);
      res.send("error creating the product table");
    }
  });

  let createPrice = `CREATE TABLE Price (
    price_id INT AUTO_INCREMENT PRIMARY KEY,
    price_item VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
  )`;

  connection.query(createPrice, (err) => {
    if (err) {
      console.log(err);
      res.send("error creating the price table");
    }
  });

  res.end("Both tables are created");
});

let createForm = `CREATE TABLE Form(
  name VARCHAR(250) NOT NULL,
  brand VARCHAR(250) NOT NULL,
  price INT NOT NULL,
  storage INT NOT NULL,
  color VARCHAR(200) NOT NULL,
  year INT NOT NULL,
  description VARCHAR(400) NOT NULL
);`;

app.get("/form", async (req, res) => {
  try {
    await connection.query(createForm);
    res.send("form table created");
  } catch (error) {
    console.log(error);
    res.status(500).send("something error");
  }
});

// we can use the below for async ones it better to use this kinds

// app.get("/install", async (req, res) => {
//   try {
//     await connection.query(createProduct);
//     await connection.query(createPrice);

//     res.end("both tables created");
//     console.log("both tables created");
//   } catch (error) {
//     console.log(error);
//     res.send("error creating table");
//   }
// });

// below this we try to add clients information submitted to the database

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded());

// /* or only using express module only not body-parser we can use the below better method */

// app.use(express.urlencoded({ extended: true }));

app.post("/addIphone", (req, res) => {
  console.table(req.body);

  const { name, brand, price, storage, color, year, description } = req.body;

  // let name = req.body.name;
  // let brand = req.body.brand;
  // let price = req.body.price;
  // let storage = req.body.storage;
  // let color = req.body.color;
  // let year = req.body.year;
  // let desc = req.body.description;

  // let insert = `INSERT INTO Form (name,brand,price,storage,color,year,description) VALUES('${name}','${brand}',${price},${storage},'${color}',${year},'${desc}')`;

  let insert = `INSERT INTO Form (name,brand,price,storage,color,year,description) VALUES(?,?,?,?,?,?,?)`;

  const values = [name, brand, price, storage, color, year, description];

  connection.query(insert, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting data");
    }
    console.table(result);

    res.send("Data entered completely");
  });
});

let insertProduct = `INSERT INTO product (product_name, product_url) VALUES (?,?)`;
let item = ["iphone", "iphone.com"];

app.get("/inserall", (req, res) => {
  connection.query(insertProduct, item, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("error inserting product");
    }
    let productID = result.insertId;
    let insertPrice = `INSERT INTO price (price_item, product_id) VALUES (?,?)`;
    let itemPrice = ["i 700", productID];

    connection.query(insertPrice, itemPrice, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("error inserting product");
      }

      res.send("all entered correctly");
    });
  });
});

//* this is just revision after the weekend *//

// const {id,name,price,place,number } = req.body;

// let insert = `INSERT INTO product (id, name, price, place, number) VALUES(?,?,?,?,?)`;

// let values = [id,name,price,place,number];

// connection.query(insert,values,(err,result,fields)=>{
//   if(err){
//     console.log(err);
//     return res.status(500).send("server down");
//   }
//   res.send(result);
// })

app.get("/show", (req, res) => {
  let select = `SELECT product.product_id AS ID, product_name, price_ID  FROM product JOIN price ON product.product_id = price.product_id`;
  connection.query(select, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    console.table(results);

    res.send(results);
  });
});
