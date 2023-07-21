const Customer = require("../models/customerModel");

module.exports = {
  addCustomer: (data) => {
    return new Promise(async (resolve, reject) => {
      await Customer.create(data).then(() => {
        resolve("success");
      });
    });
  },
  getAllCustomers: () => {
    return new Promise(async (resolve, reject) => {
      await Customer.find().then((result) => {
        resolve(result);
      });
    });
  },
  editCustomer: (data) => {
    return new Promise(async (resolve, reject) => {
      await Customer.updateOne(
        { _id: data.id },
        { $set: { status: data.status } }
      ).then(() => {
        resolve("success");
      });
    });
  },
  customerCount: () => {
    return new Promise(async (resolve, reject) => {
      const countPending = await Customer.countDocuments({
        status: "pending",
      });
      const totalCustomers = await Customer.find();
      const countReview = await Customer.countDocuments({ status: "review" });
      let countObj = {
        total: totalCustomers?.length,
        review: countReview,
        pending: countPending,
      };
      resolve(countObj);
    });
  },
};
