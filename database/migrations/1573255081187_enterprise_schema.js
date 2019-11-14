'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterpriseSchema extends Schema {
  up () {
    this.create('enterprises', (table) => {
      table.increments()
      table.string('address')
      table.string('rfc').notNullable()
      table.string('phonenumber')
      table.string('name')
      table.string('industry')
      table.timestamps()
    })
  }

  down () {
    this.drop('enterprises')
  }
}

module.exports = EnterpriseSchema
