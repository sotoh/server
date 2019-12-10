'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswersQuestionsSchema extends Schema {
  up () {
    this.create('answers_questions', (table) => {
      table.increments()
      table.integer('answer_id').unsigned().references('id').inTable('answers')
      table.integer('audit_content_id').unsigned().references('id').inTable('audit_contents')
      table.date('assign')
    })
  }

  down () {
    this.drop('answers_questions')
  }
}

module.exports = AnswersQuestionsSchema
