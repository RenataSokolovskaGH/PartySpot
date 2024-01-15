import Router from 'express';

import { serverHelper } from '../helpers';
import { routeConstants } from './definition';
import { errorCodes } from '../error-codes';
import auth from './auth';

const router = Router();

serverHelper.initializeSwaggerModule(
    {
        router,
        swaggerUri: routeConstants.routes.swaggerURI,
        customSiteTitle: "Party Spot"
    }
)

// Health check
router.get(routeConstants.routes.root, (req, res) => res.send(errorCodes.Success));

router.post(routeConstants.routes.auth.register, auth.register );

export {
    router
}
