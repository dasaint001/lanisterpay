const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeeSchema = new Schema({
  feeid: {
    type: String,
    required: true,
  },
  feecurrency: {
    type: String,
    required: true,
  },
  feelocale: {
    type: String,
    enum: ["LOCL", "INTL", "locl", "intl"],
    required: true,
  },
  feeentity: {
    type: String,
    enum: ["CREDIT-CARD", "USSD"],
    required: true,
  },
  entityproperty: {
    type: String,
    enum: ["*", "MASTERCARD", "MTN"],
    required: true,
  },
  feetype: {
    type: String,
    enum: ["PERC", "FLAT_PERC"],
    required: true,
  },
  feevalue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

FeeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Fee = mongoose.model("fee", FeeSchema);

module.exports = Fee;
