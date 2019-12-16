'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditContentSchema extends Schema {
  up () {
    this.create('audit_contents', (table) => {
      table.increments()
      table.integer('audit_id').unsigned().references('id').inTable('audits')
      table.text('question').notNullable()
      table.enu('type',['check','range','options','description'], { useNative: true, enumName: 'typequestion' }).notNullable()
      table.string('options')//.notNullable()
      //table.string('type').notNullable().comment('Describes if it is a combobox, radiobutton or checkbox')
      //table.string('category').notNullable().comment('Category to describe wether it is about Security, Network, Data, etc.')
      //table.enu('risk', ['high', 'medium','low','info'], { useNative: true, enumName: 'risklevel' }).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('audit_contents')
  }
}

module.exports = AuditContentSchema
