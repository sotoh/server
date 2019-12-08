'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AuditContent extends Model {
    answers() {
        return this.hasMany('App/Models/Answer')
    }

    subcontent() {
        return this.hasMany('App/Models/SubContent')
    }

    options() {
        return this.hasMany('App/Models/Option')
    }
}

module.exports = AuditContent
