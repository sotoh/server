'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AuditContent extends Model {
    answers() {
        return this
        .belongsToMany('App/Models/Answer')
        .pivotTable('answers_questions')
        .withPivot(['assign'])
    }

    subcontent() {
        return this.hasMany('App/Models/SubContent')
    }

    options() {
        return this.hasMany('App/Models/Option')
    }
}

module.exports = AuditContent
