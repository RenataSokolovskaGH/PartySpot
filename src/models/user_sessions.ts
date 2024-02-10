import { JSONSchema, Model, RelationMappings } from 'objection';
import { dbModels } from '../db/db-models';

export class UserSessions extends Model {
    id: number;
    user_id: number;
    auth_token: string;

    created_at: string;
    updated_at: string;

    static get tableName() {
        return dbModels.userSessions.tableName;
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                auth_token: { type: 'string' },

                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }


}
