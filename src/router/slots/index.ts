import { getAllSlots } from "../../controllers/slots";
import { Router } from "express";

const router = Router();

router.get("/get-all-slots", getAllSlots)

export default router;