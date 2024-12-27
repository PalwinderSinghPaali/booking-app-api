import { DataTypes } from 'sequelize';
import db from '../dbConnect';

const Slots = db.define('slots', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    time: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_booked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
});

Slots.sync()

export default Slots;