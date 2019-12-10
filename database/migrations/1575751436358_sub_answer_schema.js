'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubAnswerSchema extends Schema {
  up () {
    this.create('sub_answers', (table) => {
      table.increments()
      table.text('observations').nullable()
      //table.integer('auditor_id').unsigned().references('id').inTable('auditors')
      //table.integer('sub_content_id').unsigned().references('id').inTable('sub_contents')
      table.integer('value').notNullable()
      table.date('answered')
      //table.timestamps()
    })
  }

  down () {
    this.drop('sub_answers')
  }
}

module.exports = SubAnswerSchema
