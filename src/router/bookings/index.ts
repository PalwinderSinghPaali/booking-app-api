import { createBooking, getAllBookings } from "../../controllers/bookings";
import { Router } from "express";

const router = Router();

router.get("/get-all-bookings", getAllBookings);
router.post("/create-booking", createBooking);

export default router;