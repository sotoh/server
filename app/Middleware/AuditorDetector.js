'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')

class AuditorDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    let auditor = await User.query().where('email',request.input('email')).andWhere('type','auditor')
    if(!auditor){
      return response.unauthorized('Necesita derechos de Auditor')
    }
    // call next to advance the request
    await next()
  }
}

module.exports = AuditorDetector
