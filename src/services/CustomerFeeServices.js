const Fee = require("../models/FeeModels");
const CustomerFee = require("../models/CustomerFeeModels");

async function addCustomerFee(feeParams) {
  // instantiate a fee modal and save to mongoDB
  const customerfee = new CustomerFee(feeParams);

  await customerfee.save();
  return customerfee.toJSON();
}

module.exports = {
  addCustomerFee,
};
