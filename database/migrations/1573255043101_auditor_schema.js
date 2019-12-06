'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditorSchema extends Schema {
  up () {
    this.create('auditors', (table) => {
      table.increments()
      table.string('name')
      table.string('lastname')
      table.integer('user_id').notNullable().unique()
      table.string('gender')
      table.boolean('isExternal')
      table.timestamps() //For updates in the auditor's info
    })
  }

  down () {
    this.drop('auditors')
  }
}

module.exports = AuditorSchema