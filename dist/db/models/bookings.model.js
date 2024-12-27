"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../dbConnect"));
const slots_model_1 = __importDefault(require("./slots.model"));
const Bookings = dbConnect_1.default.define('bookings', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            is: {
                args: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                msg: 'Invalid email address format'
            }
        }
    },
    slot_id: {
        type: sequelize_1.DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: { model: 'slots', key: 'id' },
        onDelete: 'CASCADE',
    },
});
Bookings.belongsTo(slots_model_1.default, {
    foreignKey: "slot_id",
    as: "slot",
});
Bookings.sync();
exports.default = Bookings;
