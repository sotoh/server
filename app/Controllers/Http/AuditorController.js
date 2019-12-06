'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Auditor = use('App/Models/Auditor')
const User = use('App/Models/User')
const External = use('App/Models/External')

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
    try {
      let auditors = await Auditor.all()
      return response.accepted(auditors)
    } catch (error) {
      return response.serviceUnavailable('El servidor no responde')
    }
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
        let newAuditorUser = new User()
        newAuditorUser.username = user 
        newAuditorUser.email = email
        newAuditorUser.password = pwd
        newAuditorUser.type = 'auditor'
        await newAuditorUser.save()
        let newAuditor = new Auditor()
        newAuditor.name = request.input('name')
        newAuditor.lastname = request.input('lastname')
        newAuditor.user_id = newAuditorUser.id
        newAuditor.gender = request.input('gender')
        let isExternal = request.input('external')
        if(isExternal == 'external') {
          console.log('external')
          newAuditor.isExternal = true
          await newAuditor.save()
          let newExternal = new External()
          newExternal.company = request.input('company')
          newExternal.memberdate = request.input('memberdate')
          newAuditor.external().save(newExternal)
        } else {
          console.log('internal')
          newAuditor.isExternal = false
          await newAuditor.save()
        }
        console.log('End of the road')
        return response.created('Auditor Creado')
        //return response.status(201).send({message: 'Auditor Creado'})
      }
    } catch (error) {
      console.log(error)
      return response.internalServerError('Error del Servidor')
      /*if(error) {
        console.log(error)
        return response.notAcceptable('Error del Servidor')
      } else {
        return response.preconditionFailed('El Correo ya está registrado')
      } */     
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
