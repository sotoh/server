'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Enterprise extends Model {        
    auditors () {
        return this
          .belongsToMany('App/Models/Auditor')
          .pivotTable('auditor_enterprises')
          .withPivot(['assign'])
      }
      audits () {
        return this
          .belongsToMany('App/Models/Audit')
          .pivotTable('audit_enterprises')
          .withPivot(['status','assign'])
      }
}

module.exports = Enterprise
