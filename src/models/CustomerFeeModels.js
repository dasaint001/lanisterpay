const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerFeeSchema = new Schema({
  amount: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  currencycountry: {
    type: String,
    required: true,
  },
  customer: [
    {
      emailaddress: {
        type: String,
        required: true,
      },

      fullname: {
        type: String,
        required: true,
      },
      bearsfee: {
        type: String,
        enum: ["true", "false"],
        required: true,
        default: "true",
      },
    },
  ],

  paymententity: [
    {
      issuer: {
        type: String,
        required: true,
      },

      brand: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },

      sixid: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now(),
  },
});

CustomerFeeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const customerFee = mongoose.model("customerfee", CustomerFeeSchema);

module.exports = customerFee;
