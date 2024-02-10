import { JSONSchema, Model, RelationMappings } from 'objection';
import { dbModels } from '../db/db-models';
// import { IUserEmailSchema, IUserSchema } from 'src/interfaces';

export class Users extends Model {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    is_moderator: boolean;
    password: string;

    created_at: string;
    updated_at: string;

    static get tableName() {
        return dbModels.users.tableName;
    }


    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                username: { type: 'string' },
                is_moderator: { type: 'boolean' },
                password: { type: 'string' },


                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }


}
