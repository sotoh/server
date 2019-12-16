'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Answer extends Model {
   static get updatedAtColumn () {
    return null
  }
  static get createdAtColumn () {
    return null
  }
  questions() {
    return this
    .belongsToMany('App/Models/AuditContent')
    .pivotTable('answers_questions')
    .withPivot(['dateaudit','enterprise'])
  }
}

module.exports = Answer
