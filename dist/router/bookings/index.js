"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookings_1 = require("../../controllers/bookings");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/get-all-bookings", bookings_1.getAllBookings);
router.post("/create-booking", bookings_1.createBooking);
exports.default = router;
