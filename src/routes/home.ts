import { NextFunction, Request, Response } from "express";
import { homeCtl } from "../controllers";

export default {
    getProfile: async (
        req: Request,
        res: Response,
        next: NextFunction

    ) => {
        try {
            const result = await homeCtl.getProfile(
               req.user
            )
            res.status(200).json(result);

        } catch (err) {
            next(err);
        }
    }


}