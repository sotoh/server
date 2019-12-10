'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.text('observations').nullable()
      //table.integer('auditor_id').unsigned().references('id').inTable('auditors')
      //table.integer('audit_content_id').unsigned().references('id').inTable('audit_contents')
      table.integer('value').notNullable()//Actualizado: 5-0 para range, 1-0 para check, para descriptivo 0-100.      
      table.text('ofi').comment('Stands for Opportunities for Improvement')
      table.date('answered')
      //table.timestamps()
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
