import { NextFunction, Request, Response } from "express";
import { authCtl } from "../controllers";
import { validateBoolean, validatePassword, validateString } from "../helpers/validator";
import { errorCodes } from "../error-codes";

export default {
    register: async (
        req: Request,
        res: Response,
        next: NextFunction

    ) => {
        try {
            const {
                firstname,
                lastname,
                password,
                isModerator
            } = req.body;



            if (!validateString(firstname) || !validateString(lastname) || !validateBoolean(isModerator)) {
                return next(errorCodes.WrongParameters)
            }

            if (!validatePassword(password)) {
                return next(errorCodes.WrongPassword)
            }

            const result = await authCtl.register(
                {
                    firstname,
                    lastname,
                    password,
                    isModerator
                }
            )
            res.status(200).json(result);

        } catch (err) {
            next(err);
        }
    }


}