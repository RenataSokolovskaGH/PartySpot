import { dbModels } from '../db-models'
import { Knex } from 'knex';

const tableName = dbModels.users.tableName;

exports.up = async (knex: Knex) => {
    const updateStamp = knex.raw(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    );

    if (!await knex.schema.hasTable(tableName)) {
        await knex.schema.createTable(
            tableName,
            t => {
                t.increments('id').primary();
                t.string('first_name').notNullable().index();
                t.string('last_name').notNullable().index();
                t.string('username').notNullable().index();
                t.boolean('is_moderator').notNullable().index().defaultTo(false);

                t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
                t.timestamp('updated_at').notNullable().defaultTo(updateStamp);
            }
        )
    }
}

exports.down = async (knex: Knex) => {
    await knex.schema.hasTable(tableName).then((exists: boolean) => {
        if (exists) {
            return knex.schema.dropTable(tableName);
        }
    });
}
