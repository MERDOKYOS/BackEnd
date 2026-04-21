let express = require("express");
let mysql = require("mysql2");
let cors = require("cors");
const { urlencoded } = require("body-parser");

let app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "company",
});

connection.connect((err) => {
  if (err) {
    console.log("connecting to databse failed", err);
  } else {
    console.log("connected succesfully");
  }
});

let customer = `CREATE TABLE customers (
  cusID INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
)`;

let address = `CREATE TABLE address(
  addID INT AUTO_INCREMENT PRIMARY KEY ,
  cusID INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  FOREIGN KEY (cusID) REFERENCES customers (cusID)
)`;

let company = `CREATE TABLE company(
  comID INT AUTO_INCREMENT PRIMARY KEY,
  cusID INT NOT NULL,
  company VARCHAR(300) NOT NULL,
  FOREIGN KEY (cusID) REFERENCES customers(cusID)
)`;

app.get("/createAllTables", (req, res) => {
  connection.query(customer, (err) => {
    if (err) {
      console.log("Table not created", err);
      return res.send("ünknown error");
    } else {
      console.log("Table created");
    }

    connection.query(address, (err) => {
      if (err) {
        console.log("Table not created", err);
        return res.send("ünknown error");
      } else {
        console.log("Table created");
      }

      connection.query(company, (err) => {
        if (err) {
          console.log("Table not created", err);
          return res.send("ünknown error");
        } else {
          console.log("Table created");
        }
        res.send("tables created succesfully");
      });
    });
  });
});

app.post("/insert", (req, res) => {
  const { name, address, company } = req.body;

  let insertName = `INSERT INTO customers (name) VALUES(?)`;
  let insertAddress = `INSERT INTO address (cusID, address)  VALUES(?,?)`;
  let insertCompany = `INSERT INTO company (cusID, company) VALUES(?,?)`;

  connection.query(insertName, [name], (err, result) => {
    if (err) {
      console.log("Error Found:", err);
      return res.status(500).send("Error inserting name");
    }

    let ID = result.insertId;

    connection.query(insertAddress, [ID, address], (err, result) => {
      if (err) {
        console.log("Error Found:", err);
        return res.status(500).send("Error inserting address");
      }

      connection.query(insertCompany, [ID, company], (err, result) => {
        if (err) {
          console.log("Error Found:", err);
          return res.status(500).send("Error inserting company");
        }
        res.send("information submitted completely");
      });
    });
  });
});

app.get("/getInfo", (req, res) => {
  let select = `SELECT * FROM customers JOIN address JOIN company ON customers.cusID=address.cusID AND customers.cusID = company.cusID`;

  connection.query(select, (err, result) => {
    if (err) {
      console.log("Error in selection", err);
      return res.status(500).send("selecting erorr");
    }
    res.send(result);
  });
});

app.put("/update", (req, res) => {
  const { newName, id } = req.body;
  let update = `UPDATE customers SET name = ? WHERE cusID=?`;

  connection.query(update, [newName, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("update failure");
    }
    console.log(result.affectedRows, "affected elements");
    res.send(result);
  });
});

app.delete("/delete", (req, res) => {
  const { id } = req.body;

  let deleteName = `DELETE FROM customers WHERE cusID = ?`;
  let deleteAd = `DELETE FROM address WHERE cusID = ?`;
  let deleteCom = `DELETE FROM company WHERE cusID = ?`;

  connection.query(deleteCom, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("failure deleting company");
    }
    console.log(result.affectedRows, "company deleted");

    connection.query(deleteAd, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("failure deleting address");
      }
      console.log(result.affectedRows, "address deleted");

      connection.query(deleteName, [id], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("failure deleting company");
        }
        console.log(result.affectedRows, "name deleted");

        res.send("deleted successfully");
      });
    });
  });
});

app.listen(5000, () => {
  console.log("Listening to port 5000 http://localhost:5000");
});
