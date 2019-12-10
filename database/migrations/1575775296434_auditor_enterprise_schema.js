'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditorEnterpriseSchema extends Schema {
  up () {
    this.create('auditor_enterprises', (table) => {
      table.increments()
      table.integer('enterprise_id').unsigned().references('id').inTable('enterprises')
      table.integer('auditor_id').unsigned().references('id').inTable('auditors')
      table.date('assign')
      //table.timestamps()
    })
  }

  down () {
    this.drop('auditor_enterprises')
  }
}

module.exports = AuditorEnterpriseSchema
