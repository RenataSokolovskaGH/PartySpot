import { Users } from "./models";

declare global {
    namespace Express {
        interface Request {
            user: Users;
        }
    }
}