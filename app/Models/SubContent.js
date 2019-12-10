'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SubContent extends Model {
    subanswers() {
        return this
        .belongsToMany('App/Models/SubAnswer')
        .pivotTable('question_subanswers')
        .withPivot(['assign'])
    }
}

module.exports = SubContent
