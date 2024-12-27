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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || "local"}` });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const interface_1 = __importDefault(require("./middlewares/interface"));
const logging_1 = __importDefault(require("./middlewares/logging"));
const slots_1 = __importDefault(require("./router/slots"));
const bookings_1 = __importDefault(require("./router/bookings"));
const moment_1 = __importDefault(require("moment"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dbConnect_1.default.sync({ force: false });
    try {
        yield dbConnect_1.default.authenticate();
        console.log("Database Connected successfully.");
        const used = process.memoryUsage();
        console.log(`Memory usage: ${JSON.stringify(used)}`);
        console.log("Current Server Time", (0, moment_1.default)());
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
app.use(express_1.default.json({ limit: '2450mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(interface_1.default);
app.use(logging_1.default);
app.use("/slot", slots_1.default);
app.use("/booking", bookings_1.default);
app.listen(PORT, () => {
    connectToDb();
    console.log(`Server started on port ${PORT}`);
});
