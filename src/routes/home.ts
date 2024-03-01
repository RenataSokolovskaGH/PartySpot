import { NextFunction, Request, Response } from "express";
import { homeCtl } from "../controllers";
import { validateBoolean, validateEventFilter, validatePassword, validateString } from "../helpers/validator";
import { errorCodes } from "../error-codes";

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
    },
    showEvents: async (
        req: Request,
        res: Response,
        next: NextFunction

    ) => {
        try {
            let {
                search,
                status,
                filter
            } = req.body

            if (filter) {
                if (!validateEventFilter(filter)) {
                    return next(errorCodes.WrongParameters)
                }
            } else {
                filter = null;
            }

            if (status) {
                if (!validateString(status)) {
                    return next(errorCodes.WrongParameters)
                }
            } else {
                status = null;
            }

            if (search) {
                if (!validateString(search)) {
                    return next(errorCodes.WrongParameters)
                }
            } else {
                search = null;
            }


            // toa sto treba da se prati kako request za otposle da se dobie response
            const result = await homeCtl.showEvents(
                {
                    filter,
                    search,
                    status
                }
            )
            res.status(200).json(result);

        } catch (err) {
            next(err);
        }
    }


}