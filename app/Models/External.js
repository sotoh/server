'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class External extends Model {
     auditor () {
      return this.belongsTo('App/Models/Auditor')    
  }
}

module.exports = External
