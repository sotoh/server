'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Audit extends Model {
    enterprises () {
        return this.belongsToMany('App/Models/Enterprise')
        .pivotTable('audit_enterprises')
      }

      questions() {
          return this.hasMany('App/Models/AuditContent')
      }
}

module.exports = Audit
