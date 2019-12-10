'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditEnterpriseSchema extends Schema {
  up () {
    this.create('audit_enterprises', (table) => {
      table.increments()      
      table.integer('enterprise_id').unsigned().references('id').inTable('enterprises')
      table.integer('audit_id').unsigned().references('id').inTable('audits')
      table.date('assign')
      table.enu('status', ['pending', 'completed','uninitiated'], { useNative: true, enumName: 'auditstatus' }).notNullable()
      //table.timestamps()
    })
  }

  down () {
    this.drop('audit_enterprises')
  }
}

module.exports = AuditEnterpriseSchema
