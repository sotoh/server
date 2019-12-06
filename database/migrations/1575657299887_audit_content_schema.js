'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditContentSchema extends Schema {
  up () {
    this.create('audit_contents', (table) => {
      table.increments()
      table.integer('audit_id').unsigned().references('id').inTable('audits')
      table.string('question').notNullable()
      table.string('type').notNullable().comment('Describes if it is a combobox, radiobutton or checkbox')
      table.string('category').notNullable().comment('Category to describe wether it is about Security, Network, Data, etc.')
      table.text('observations').nullable()
      table.integer('value').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('audit_contents')
  }
}

module.exports = AuditContentSchema
