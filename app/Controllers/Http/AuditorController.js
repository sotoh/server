'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const EndUser = use('App/Models/User')

/**
 * Resourceful controller for interacting with auditors
 */
class AuditorController {  

  /**
   * Show a list of all auditors.
   * GET auditors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new auditor.
   * GET auditors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new auditor.
   * POST auditors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let userExists = await EndUser.findBy('email',request.input('email'))
      if (userExists) {
        return response.status(400).send({
          message: 'El correo ya está registrado'
      })
      }
      else {
        let email = request.input('email')
        let user = request.input('user')
        let pwd =  request.input('password')
        let newAuditor = new EndUser()
        newAuditor.username = user 
        newAuditor.email = email
        newAuditor.password = pwd
        newAuditor.type = 'auditor'
        await newAuditor.save()
      }
    } catch (error) {
      return response.status(500).send({
        message: 'Error Servidor'
      })
    }
  }

  /**
   * Display a single auditor.
   * GET auditors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing auditor.
   * GET auditors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update auditor details.
   * PUT or PATCH auditors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a auditor with id.
   * DELETE auditors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AuditorController
