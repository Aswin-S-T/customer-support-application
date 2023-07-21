const express = require("express");
const {
  addCustomer,
  getAllCustomers,
  editCustomer,
  customerCount,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user router called");
});

userRouter.post("/add-customer", (req, res) => {
  let data = req.body;
  addCustomer(data).then((response) => {
    res.send(response);
  });
});

userRouter.get("/get-customer", (req, res) => {
  getAllCustomers().then((response) => {
    res.send(response);
  });
});

userRouter.post("/edit-customer", (req, res) => {
  editCustomer(req.body).then((response) => {
    res.send(response);
  });
});

userRouter.get("/customer-count", (req, res) => {
  customerCount().then((response) => {
    res.send(response);
  });
});

module.exports = userRouter;
