'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Answer extends Model {
   static get updatedAtColumn () {
    return 'updated_at'
  }
  static get createdAtColumn () {
    return 'created_at'
  }
  questions() {
    return this
    .belongsToMany('App/Models/AuditContent')
    .pivotTable('answers_questions')
    .withPivot(['assign'])
  }
}

module.exports = Answer
