const express = require("express");
const { biogasHandler } = require("../controllers/biogasController");

const router = express.Router();

router.post("/biogas-suggestion", biogasHandler);

module.exports = router;
