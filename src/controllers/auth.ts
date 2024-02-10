import { random } from "lodash";
import { errorCodes } from "../error-codes";
import { ILogin, IRegister, IUserLimitCounter, RLogin, RRegister } from "../interfaces";
import { UserSessions, Users } from "../models";
import { randomBytes } from "crypto";

class AuthCtl {
    private readonly _authTokenLength = 100;

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

    //od ovdeka pocnuva login
    private async _getUser(
        username: string
    ): Promise<Users | undefined> {
        return await Users.query().findOne({ username })
    }

    public async login(data: ILogin): Promise<RLogin> {
        const validUser = await this._getUser(data.username)

        if (
            !validUser ||
            validUser.password !== data.password
        ) {
            throw errorCodes.InvalidCredentials;
        }

        const authToken = await this._generateAuthToken(this._authTokenLength)
        await UserSessions.query().insert(
            {
                user_id: validUser.id,
                auth_token: authToken
            }
        )

        return {
            authToken
        }
    }

    private async _isAuthTokenUnique(authToken: string): Promise<boolean> {
        return !await UserSessions.query().findOne({ auth_token: authToken })
    }

    private async _generateAuthToken(length: number): Promise<string> {
        let authToken = randomBytes(length).toString('base64url').substring(0, length)

        if (!await this._isAuthTokenUnique(authToken)) {
            authToken = await this._generateAuthToken(length)
        }

        return authToken;
    }

}

const authCtl = new AuthCtl();

export {
    authCtl
}


