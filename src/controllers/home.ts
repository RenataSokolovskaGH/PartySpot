import { RGetProfile } from "../interfaces";
import { Users } from "../models";

class HomeCtl {

    public async getProfile(user: Users): Promise<RGetProfile> {
        return user.userProfile()
    }

}

const homeCtl = new HomeCtl();

export {
    homeCtl
}


