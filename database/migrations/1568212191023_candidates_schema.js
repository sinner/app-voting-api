'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CandidatesSchema extends Schema {
  up () {
    this.create('candidates', (table) => {
      table.increments();
      table.boolean('is_main', 80).defaultTo(false).index();
      table.string('name', 80).notNullable();
      table.text('resume').notNullable();
      table.string('category', 15).index();
      table.integer('positive_votes').defaultTo(0);
      table.integer('negative_votes').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.date('expires_at').notNullable();
      table.timestamps();
    });
  }

  down () {
    this.drop('candidates');
  }
}

module.exports = CandidatesSchema;
