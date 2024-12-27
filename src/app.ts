import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "local"}` });

import express from 'express';
import cors from "cors";

import sequelize from "./db/dbConnect";
import setInterface from "./middlewares/interface";
import logging from "./middlewares/logging";

import slotRouter from "./router/slots";
import bookingRouter from "./router/bookings";

import moment from "moment";

const PORT = process.env.PORT;
const app = express();

const connectToDb = async () => {
    const data = await sequelize.sync({ force: false })
    try {
      await sequelize.authenticate();
        console.log("Database Connected successfully.");
        const used = process.memoryUsage();
        console.log(`Memory usage: ${JSON.stringify(used)}`);
        console.log("Current Server Time", moment());
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

app.use(express.json({ limit: '2450mb' }));
app.use(express.urlencoded({ extended: true }));


var corsOptions = {
    origin: function (origin: any, callback: any) {
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(setInterface);
app.use(logging);

app.use("/slot", slotRouter);
app.use("/booking", bookingRouter);

app.listen(PORT, () => {
    connectToDb();
    console.log(`Server started on port ${PORT}`);
})
