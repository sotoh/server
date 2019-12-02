'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExternalSchema extends Schema {
  up () {
    this.create('externals', (table) => {
      table.increments()
      table.string('company')
      table.string('memberdate')
      table.integer('auditor_id').unsigned().references('id').inTable('auditors')
      table.timestamps()
    })
  }

  down () {
    this.drop('externals')
  }
}

module.exports = ExternalSchema
