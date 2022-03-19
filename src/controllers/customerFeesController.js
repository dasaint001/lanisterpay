const express = require("express");
const router = express.Router();
const feeService = require("../services/FeeServices.js");
const customerFeeService = require("../services/CustomerFeeServices.js");

// routes
router.post("/compute-transaction-fee", createCustomerFee);

function createCustomerFee(req, res, next) {
  if (
    req.body.paymententity.brand === "*" &&
    req.body.paymententity.country === "NG"
  ) {
    var appliedfeevalue = (1.4 / 100) * req.body.amount;
    var appliedfeeid = "LNPY1221";
  }
  if (
    req.body.paymententity.brand === "*" &&
    req.body.paymententity.country !== "NG"
  ) {
    var appliedfeevalue = (5.8 / 100) * req.body.amount;
    var appliedfeeid = "LNPY1223";
  }

  if (
    req.body.paymententity.brand === "*" &&
    req.body.paymententity.type == "USSD"
  ) {
    var appliedfeevalue = 20 + (0.5 / 100) * req.body.amount;
    var appliedfeeid = "LNPY1224";
  }
  if (
    req.body.paymententity.brand !== "*" &&
    req.body.paymententity.type == "USSD"
  ) {
    var appliedfeevalue = 20 + (0.5 / 100) * req.body.amount;
    var appliedfeeid = "LNPY1224";
  }
  if (req.body.customer.bearsfee === "false") {
    var chargeamount = req.body.amount;
  } else {
    var chargeamount = appliedfeevalue + req.body.amount;
  }

  var data = {
    AppliedFeeID: appliedfeeid,
    AppliedFeeValue: appliedfeevalue,
    ChargeAmount: chargeamount,
    SettlementAmount: chargeamount - appliedfeevalue,
  };

  res.send({ data });
  //   customerFeeService
  //     .addCustomerFee(req.body)
  //     .then((data) => res.send({ data }))
  //     .catch((err) => next(err));
}

module.exports = router;
