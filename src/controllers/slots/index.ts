import { Request, Response } from 'express';
import sequelize from '../../db/dbConnect';
import { Op } from 'sequelize';
import Slots from '../../db/models/slots.model';

export const getAllSlots = async (req: Request, res: Response) => {
    try {
        const slots = await Slots.findAll({
            order:[['id','ASC']]
        });
          return res.sendSuccess(res, slots);
    } catch (error: any) {
        console.log(error)
        return  res.sendError(res, error?.message);
    }
}