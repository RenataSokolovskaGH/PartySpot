import Router from 'express';

import { serverHelper } from '../helpers';
import { routes } from './definition';
import { errorCodes } from '../error-codes';
import auth from './auth';
import home from './home';
import { checkAuthToken, showTheRoute } from '../middleware';

const router = Router();

serverHelper.initializeSwaggerModule(
    {
        router,
        swaggerUri: routes.swaggerURI,
        customSiteTitle: "Party Spot"
    }
)
// Chech authorization
router.use(routes.home.root, showTheRoute)

router.use(routes.home.root, checkAuthToken);

// Health check
router.get(routes.root, (req, res) => res.send(errorCodes.Success));
//Auth
router.post(routes.auth.register, auth.register);
router.post(routes.auth.login, auth.login);

//Home

router.get(routes.home.getProfile, home.getProfile);
router.post(routes.home.showEvents, home.showEvents)

export {
    router
}
