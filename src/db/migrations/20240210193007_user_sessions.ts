import { Knex } from "knex";
import { dbModels } from '../db-models'


const tableName = dbModels.userSessions.tableName;

exports.up = async (knex: Knex) => {
    const updateStamp = knex.raw(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    );

    if (!await knex.schema.hasTable(tableName)) {
        await knex.schema.createTable(
            tableName,
            t => {
                t.increments('id').primary();
                t.integer('user_id').unsigned().notNullable().index();
                t.string('auth_token').notNullable().index();

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
