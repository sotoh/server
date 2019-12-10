'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSubanswersSchema extends Schema {
  up () {
    this.create('question_subanswers', (table) => {
      table.increments()
      table.integer('sub_answer_id').unsigned().references('id').inTable('sub_answers')
      table.integer('sub_content_id').unsigned().references('id').inTable('sub_contents')
      table.date('assign')
    })
  }

  down () {
    this.drop('question_subanswers')
  }
}

module.exports = QuestionSubanswersSchema
