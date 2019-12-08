'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubContentSchema extends Schema {
  up () {
    this.create('sub_contents', (table) => {
      table.increments()
      table.integer('audit_content_id').unsigned().references('id').inTable('audit_contents')
      table.string('question').notNullable()
      table.enu('type',['check','range','quantity','description'], { useNative: true, enumName: 'typesubquestion' }).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_contents')
  }
}

module.exports = SubContentSchema
