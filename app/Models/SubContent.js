'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SubContent extends Model {
    subanswers() {
        return this.hasMany('App/Models/SubAnswer')
    }
}

module.exports = SubContent
