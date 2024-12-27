"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slots_1 = require("../../controllers/slots");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/get-all-slots", slots_1.getAllSlots);
exports.default = router;
