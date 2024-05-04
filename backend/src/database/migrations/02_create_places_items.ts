/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('places_items', table => {
        table.increments('id').primary();
        table.integer('place_id').notNullable().references('id').inTable('places');
        table.integer('item_id').notNullable().references('id').inTable('items');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('places_items');
}