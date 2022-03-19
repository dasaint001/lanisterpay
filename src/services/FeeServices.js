const Fee = require("../models/FeeModels");

async function addFee(feeParams) {
  // instantiate a fee modal and save to mongoDB
  const fee = new Fee(feeParams);

  if (
    fee.feeid !== feeParams.name &&
    (await Fee.findOne({ feeid: feeParams.feeid }))
  ) {
    throw 'Fee name "' + feeParams.feeid + '" is already taken';
  }
  await fee.save();
  return fee.toJSON();
}

async function getById(id) {
  return await Fee.findById(id);
}

async function getFees() {
  return await Fee.find();
}

async function editFee(id, feeParams) {
  const fee = await Fee.findById(id);

  // validate
  if (!fee) throw "Fee not found";
  if (
    fee.feeid !== feeParams.name &&
    (await Fee.findOne({ feeid: feeParams.feeid }))
  ) {
    throw 'Fee name "' + feeParams.feeid + '" is already taken';
  }

  // copy feeParam properties to fee
  Object.assign(fee, feeParams);

  await fee.save();
}

async function removeFee(id) {
  const fee = await Fee.findById(id);
  if (!fee) throw "Fee not found";
  await Fee.findByIdAndRemove(id);
}

module.exports = {
  addFee,
  getById,
  getFees,
  editFee,
  removeFee,
};
