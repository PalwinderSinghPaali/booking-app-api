"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// import association from '../models/associations';
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process = require("process");
const env = process.env.NODE_ENV || "local";
const config = require("./config/config");
// import config from '../conf/config'
const db = {};
let sequelize;
if (config.use_env_variable) {
    // sequelize = new Sequelize(process.env[config.use_env_variable], config);
    sequelize = new sequelize_1.Sequelize(process.env[config.use_env_variable], Object.assign(Object.assign({}, config), { dialect: 'postgres', pool: {
            max: 20, // Increase maximum number of connections
            min: 0,
            acquire: 60000, // Increase timeout to 60 seconds (adjust as needed)
            idle: 30000 // Increase idle timeout to 30 seconds (adjust as needed)
        } }));
}
else {
    sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, Object.assign(Object.assign({}, config), { pool: {
            max: 20, // Increase maximum number of connections
            min: 0,
            acquire: 60000, // Increase timeout to 60 seconds (adjust as needed)
            idle: 30000 // Increase idle timeout to 30 seconds (adjust as needed)
        } }));
}
// Get the list of all model files
const modelsPath = path_1.default.join(__dirname, "./models");
const modelFiles = fs_1.default
    .readdirSync(modelsPath)
    .filter((file) => file.endsWith(".model.ts"));
exports.default = sequelize;
