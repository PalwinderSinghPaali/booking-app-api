"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = exports.createBooking = void 0;
const dbConnect_1 = __importDefault(require("../../db/dbConnect"));
const slots_model_1 = __importDefault(require("../../db/models/slots.model"));
const bookings_model_1 = __importDefault(require("../../db/models/bookings.model"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield dbConnect_1.default.transaction();
    try {
        const { name, email, slotId } = req.body;
        const slot = yield slots_model_1.default.findOne({ where: { id: slotId, is_booked: false } });
        if (!slot) {
            return res.sendError(res, 'Slot is already booked');
        }
        const bookingData = {
            slot_id: slotId,
            email,
            name
        };
        const booking = yield bookings_model_1.default.create(bookingData, { transaction });
        yield slots_model_1.default.update({ is_booked: true }, { where: { id: slotId }, transaction });
        yield transaction.commit();
        return res.sendSuccess(res, booking);
    }
    catch (error) {
        console.log(error);
        if (transaction)
            yield transaction.rollback();
        return res.sendError(res, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createBooking = createBooking;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookings_model_1.default.findAll({
            include: [
                {
                    model: slots_model_1.default,
                    as: 'slot',
                }
            ],
            order: [['createdAt', 'DESC']],
        });
        return res.sendSuccess(res, bookings);
    }
    catch (error) {
        console.log(error);
        return res.sendError(res, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllBookings = getAllBookings;
