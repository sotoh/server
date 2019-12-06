'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Enterprise = use('App/Models/Enterprise')
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with enterprises
 */
class EnterpriseController {
  /**
   * Show a list of all enterprises.
   * GET enterprises
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let enterprises = await Enterprise.all()
      return response.accepted(enterprises)
    } catch (error) {
      return response.internalServerError('Error del Servidor')
    }
  }

  /**
   * Render a form to be used for creating a new enterprise.
   * GET enterprises/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new enterprise.
   * POST enterprises
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      console.log('entro')
      let emailExists = await User.findBy('email',request.input('email'))
      if (emailExists) {
        return response.preconditionFailed('El Correo ya está registrado')
      }
      let userExists = await User.findBy('username',request.input('username'))
      if(userExists) {
        return response.preconditionFailed('El Usuario ya está en uso')
      }
      else {
        let email = request.input('email')
        let user = request.input('username')
        let pwd =  request.input('password')
        let newEnterpriseUser = new User()
        newEnterpriseUser.username = user 
        newEnterpriseUser.email = email
        newEnterpriseUser.password = pwd
        newEnterpriseUser.type = 'enterprise'
        await newEnterpriseUser.save()
        let newEnterprise = new Enterprise()
        newEnterprise.address = request.input('address')
        newEnterprise.rfc = request.input('rfc')
        newEnterprise.user_id = newEnterpriseUser.id
        newEnterprise.name = request.input('name')  
        newEnterprise.industry = request.input('industry')        
        await newEnterprise.save()
        return response.created('Empresa Creada')
      }
    } catch (error) {
      return response.internalServerError('Error del Servidor')
      /*if(error) {
        console.log(error)
        return response.notAcceptable('Error del Servidor')
      } else {
        return response.preconditionFailed('El Correo ya está registrado')
      }*/
    }
  }

  /**
   * Display a single enterprise.
   * GET enterprises/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing enterprise.
   * GET enterprises/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update enterprise details.
   * PUT or PATCH enterprises/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a enterprise with id.
   * DELETE enterprises/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EnterpriseController
