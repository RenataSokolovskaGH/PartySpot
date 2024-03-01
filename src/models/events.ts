import { JSONSchema, Model, RelationMappings } from 'objection';
import { dbModels } from '../db/db-models';
import { IEventSchema } from '../interfaces';

export class Events extends Model {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    status: string;

    created_at: string;
    updated_at: string;

    static get tableName() {
        return dbModels.events.tableName;
    }


    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                start_date: { type: 'string' },
                end_date: { type: 'string' },
                status: { type: 'string' },

                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }

    eventSchema(): IEventSchema {
        return {
            endTime: this.end_date,
            eventId: this.id,
            name: this.name,
            startTime: this.start_date,
            status: this.status
        }
    }


}
