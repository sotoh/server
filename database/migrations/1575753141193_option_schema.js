'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionSchema extends Schema {
  up () {
    this.create('options', (table) => {
      table.increments()
      table.integer('audit_content_id').unsigned().references('id').inTable('audit_contents')
      table.integer('value').notNullable()      
      table.string('option')
      table.timestamps()
    })
  }

  down () {
    this.drop('options')
  }
}

module.exports = OptionSchema
