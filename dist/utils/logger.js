"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const path = require('path');
// Define custom log formats
const logFormat = winston_1.default.format.printf(({ timestamp, level, message, stack, meta }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message || stack} ${meta ? JSON.stringify(meta) : ''}`;
});
// Create the log directory structure
const createLogDir = (dir) => {
    const fs = require('fs');
    // const logDir = path.join(__dirname, 'logs', dir);
    const logDir = path.join(process.cwd(), 'logs', dir);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};
// Ensure directories for logs are created
['combined', 'errors', 'exceptions', 'rejections'].forEach(createLogDir);
// Log rotation configuration for each log type
const dailyRotateFileTransport = (folder, filename) => new winston_1.default.transports.DailyRotateFile({
    filename: path.join(process.cwd(), 'logs', folder, filename),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // Compress old logs
    maxSize: '20m', // Rotate when file size exceeds 20MB
    maxFiles: '14d', // Keep logs for 14 days
});
// Create Winston logger
const logger = winston_1.default.createLogger({
    level: 'info', // Default log level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), // Capture stack traces for errors
    logFormat),
    transports: [
        // Combined log (info, warn, error)
        dailyRotateFileTransport('combined', 'combined-%DATE%.log'),
        // Error log (only errors)
        new winston_1.default.transports.DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'errors', 'errors-%DATE%.log'),
            level: 'error', // Only capture errors
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
        // Console log for debugging
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        }),
    ],
    exceptionHandlers: [
        // Separate log file for exceptions
        dailyRotateFileTransport('exceptions', 'exceptions-%DATE%.log'),
    ],
    rejectionHandlers: [
        // Separate log file for unhandled promise rejections
        dailyRotateFileTransport('rejections', 'rejections-%DATE%.log'),
    ],
});
exports.default = logger;
