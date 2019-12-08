'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Auditor extends Model {
    /*static boot () {
        super.boot() */ 
        /**
         * A hook to insert if the auditor is external before saving
         * it to the database.
         */
        /*this.addHook('beforeSave', async (userInstance) => {
          if (userInstance.dirty.password) {
            userInstance.password = await Hash.make(userInstance.password)
          }
        })
      }*/
      external () {
        return this.hasOne('App/Models/External')
      }
      /*answers() {
        return this.hasMany('App/Models/Answers')
      }

      subanswers() {
        return this.hasMany('App/Models/SubAnswers')
      }*/

    enterprises () {
      return this
        .belongsToMany('App/Models/Enterprise')
        .pivotTable('auditor_enterprises')
    }
}

module.exports = Auditor
