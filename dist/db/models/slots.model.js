"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../dbConnect"));
const Slots = dbConnect_1.default.define('slots', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    time: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    is_booked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
});
Slots.sync();
exports.default = Slots;
