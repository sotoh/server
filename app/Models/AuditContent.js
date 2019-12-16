'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AuditContent extends Model {
    questions() {
        return this
        .belongsToMany('App/Models/AuditContent')
        .pivotTable('answers_questions')
        .withPivot(['dateaudit','enterprise'])
      }
}

module.exports = AuditContent
