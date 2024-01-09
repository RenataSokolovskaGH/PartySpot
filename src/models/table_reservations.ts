import { JSONSchema, Model } from 'objection';
import { dbModels } from '../db/db-models';

export class TableReservations extends Model {
    id: number;
    alias: string;
    voucher: number | null;
    bottle: string | null;
    phone: string | null;
    referrer: string | null;

    created_at: string;
    updated_at: string;

    static get tableName() {
        return dbModels.tableReservations.tableName;
    }


    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                alias: { type: 'string' },
                voucher: { type: ['integer', 'null'] },
                bottle: { type: ['string', 'null'] },
                phone: { type: ['string', 'null'] },
                referrer: { type: ['string', 'null'] },

                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }

}
