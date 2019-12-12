'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Audit extends Model {
      questions() {
          return this.hasMany('App/Models/AuditContent')
      }
            
      enterprises () {
        return this
          .belongsToMany('App/Models/Enterprise')
          .pivotTable('audit_enterprises')
          .withPivot(['status','assign'])
      }

      subcontents() {
        return this.manyThrough('App/Models/AuditContent', 'subcontent')
      }
      static get hidden () {
        return ['start_at','end_at','created_at','updated_at']
      }
}

module.exports = Audit
