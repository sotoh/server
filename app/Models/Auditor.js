'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Auditor extends Model {
      external () {
        return this.hasOne('App/Models/External')
      }
    enterprises () {
      return this
        .belongsToMany('App/Models/Enterprise')
        .pivotTable('auditor_enterprises')
    }
    user () {
      return this.belongsTo('App/Models/User')
    }
}

module.exports = Auditor
