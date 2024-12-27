import { DataTypes } from 'sequelize';
import db from '../dbConnect';
import Slots from './slots.model';


const Bookings = db.define('bookings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: { model: 'slots', key: 'id' },
      onDelete: 'CASCADE',
    },
});

Bookings.belongsTo(Slots, {
  foreignKey: "slot_id",
  as: "slot",
});

Bookings.sync()

export default Bookings;

