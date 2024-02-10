import { random } from "lodash";
import { errorCodes } from "../error-codes";
import { IRegister, IUserLimitCounter, RRegister } from "../interfaces";
import { Users } from "../models";

class AuthCtl {

    private async _generateUsername(firstname: string, lastname: string, counter?: IUserLimitCounter): Promise<string | null> {
        if (!counter) {
            counter = {
                limit: 100,
                used: 0
            }
        }

        if (counter.used > counter.limit) {
            return null;
        }
        let username: string | null = firstname + lastname + random(0, 100);

        counter.used++;

        if (await this._checkUsernameExists(username.toLowerCase())) {
            username = await this._generateUsername(firstname, lastname, counter);
        }

        return username;
    }

    public async register(data: IRegister): Promise<RRegister> {
        // check username exists
        const username = await this._generateUsername(data.firstname, data.lastname)

        if (!username) {
            throw errorCodes.EnableToGenerateUsername;
        }

        const newUser = await Users.query().insertAndFetch({
            first_name: data.firstname,
            last_name: data.lastname,
            username,
            is_moderator: data.isModerator,
            password: data.password
        })
        
        return {
            username,
            userId: newUser.id
        }
    }

    private async _checkUsernameExists(
        username: string
    ): Promise<boolean> {
        return !!await Users.query().findOne({ username })
    }
}

const authCtl = new AuthCtl();

export {
    authCtl
}


