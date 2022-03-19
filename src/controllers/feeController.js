const express = require("express");
const router = express.Router();
const feeService = require("../services/FeeServices.js");
const customerFeeService = require("../services/CustomerFeeServices.js");

// routes
router.post("/", createFee);
router.get("/", getAllFees);
router.get("/:id", getFeeById);
router.put("/:id", updateFee);
router.delete("/:id", _deleteFee);

function createFee(req, res, next) {
  feeService
    .addFee(req.body)
    .then(() =>
      res.status(201).json({
        status: "ok",
      })
    )
    .catch((err) => next(err));
}

function getFeeById(req, res, next) {
  feeService
    .getById(req.params.id)
    .then((fee) =>
      fee
        ? res.json({
            status: true,
            fees: fee,
          })
        : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function getAllFees(req, res, next) {
  feeService
    .getFees()
    .then((fee) =>
      res.json({
        status: true,
        fees: fee,
      })
    )
    .catch((err) => next(err));
}

function updateFee(req, res, next) {
  feeService
    .editFee(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _deleteFee(req, res, next) {
  feeService
    .removeFee(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

module.exports = router;
