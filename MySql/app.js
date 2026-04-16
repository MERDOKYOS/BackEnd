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
