'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.text('observations').nullable()
      table.integer('value').notNullable()//Valor de la opcion: 0-100
      table.string('option').notNullable()//Opcion seleccionada: 1-4 (5) para range, 0 para check, -1 para descriptivo.
      table.text('ofi').comment('Stands for Opportunities for Improvement')
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
