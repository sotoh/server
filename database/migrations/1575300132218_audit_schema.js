'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditSchema extends Schema {
  up () {
    this.create('audits', (table) => {
      table.increments()
      table.boolean('isCustom').notNullable()
      //table.enu('status', ['pending', 'completed','uninitiated'], { useNative: true, enumName: 'auditstatus' }).notNullable()
      table.string('name').notNullable()
      table.date('start_at')
      table.date('end_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('audits')
  }
}

module.exports = AuditSchema
