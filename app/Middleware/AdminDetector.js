'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')

class AdminDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    let admin = await User.query().where({email:request.input('email'), type: 'admin' })
    if(!admin){
      return response.unauthorized('Necesita derechos de Administrador')
    }
    // call next to advance the request
    await next()
  }
}

module.exports = AdminDetector
