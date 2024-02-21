import { NextFunction, Request, Response } from "express";
import { validateString } from "../helpers/validator";
import { errorCodes } from "../error-codes";
import { UserSessions } from "../models";
import { authCtl } from "../controllers";

const checkAuthToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authToken = req.headers['auth-token']; //req.header('auth-token'); 

    if (!authToken || !validateString(authToken)) {
        return next(errorCodes.AccessDenied);
    }

    const userSession = await UserSessions.query().findOne({ auth_token: authToken })

    if (!userSession) {
        return next(errorCodes.AccessDenied);
    }

    const user = await authCtl.getUserById(userSession.user_id)

    if (!user) {
        return next(errorCodes.AccessDenied);
    }

    req.user = user;

    next();
}

export {
    checkAuthToken
}
