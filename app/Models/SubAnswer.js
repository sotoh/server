'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SubAnswer extends Model {
    static get updatedAtColumn () {
        return 'updated_at'
      }
      static get createdAtColumn () {
        return 'created_at'
      }
    subquestions() {
        return this
        .belongsToMany('App/Models/SubAnswer')
        .pivotTable('question_subanswers')
        .withPivot(['assign'])
    }
}

module.exports = SubAnswer
