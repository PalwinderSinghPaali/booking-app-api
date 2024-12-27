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
exports.getAllSlots = void 0;
const slots_model_1 = __importDefault(require("../../db/models/slots.model"));
const getAllSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slots = yield slots_model_1.default.findAll({
            order: [['id', 'ASC']]
        });
        return res.sendSuccess(res, slots);
    }
    catch (error) {
        console.log(error);
        return res.sendError(res, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllSlots = getAllSlots;
