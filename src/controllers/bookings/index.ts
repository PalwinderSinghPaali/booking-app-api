import { Request, Response } from 'express';
import sequelize from '../../db/dbConnect';
import { Op } from 'sequelize';
import Slots from '../../db/models/slots.model';
import Bookings from '../../db/models/bookings.model';

export const createBooking = async (req: Request, res: Response) =>{
    const transaction = await sequelize.transaction();
    try {
        const { name, email, slotId } = req.body;

        const slot = await Slots.findOne({ where: { id: slotId, is_booked: false } });

        if (!slot) {
          return  res.sendError(res, 'Slot is already booked');
        }

        const bookingData = {
            slot_id: slotId,
            email,
            name
        }

        const booking = await Bookings.create(bookingData, { transaction });
        await Slots.update({is_booked: true}, { where:{id: slotId}, transaction });
        await transaction.commit();

        return res.sendSuccess(res, booking);
        } catch (error: any) {
          console.log(error)
          if (transaction) await transaction.rollback();
          return  res.sendError(res, error?.message);
      }
}

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Bookings.findAll({ 
            include: [
                {
                  model: Slots,
                  as: 'slot',
                }
              ],
              order: [['createdAt', 'DESC']],
         });

          return res.sendSuccess(res, bookings);
    } catch (error: any) {
        console.log(error)
        return  res.sendError(res, error?.message);
    }
}