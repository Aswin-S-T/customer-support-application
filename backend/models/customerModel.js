const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  issue_no: { type: String },
  summary: { type: String },
  status: { type: String, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
