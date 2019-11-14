'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditorSchema extends Schema {
  up () {
    this.create('auditors', (table) => {
      table.increments()
      table.string('name')
      table.string('lastname')
      table.string('phonenumber')
      table.timestamps()
    })
  }

  down () {
    this.drop('auditors')
  }
}

module.exports = AuditorSchema