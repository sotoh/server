'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Enterprise extends Model {
    audits () {
    return this.belongsToMany('App/Models/Audit')
    .pivotTable('audit_enterprises')
  }
}

module.exports = Enterprise
