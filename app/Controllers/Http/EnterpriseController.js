'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Enterprise = use('App/Models/Enterprise')
const Audit = use('App/Models/Audit')
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
      if(enterprises) {
        return response.ok(enterprises)
      } else {
        return response.noContent()
      }     
    } catch (error) {
      return response.badRequest('Error en la petición')
    }
  }

   /**
   * Asign Audit to Enterprise.
   * PUT or PATCH admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async assign ({ request, response, params }) {
    try {
      let enterprise = await Enterprise.findBy('id',params.id)
      if(enterprise) {
        let audit = await Audit.findBy('id',request.input('enterprise',0))
        if(audit) {
          let date = request.input('date',undefined)
          if(date) {
            return response.badRequest('Error en la petición: Fecha')
          } else {
            await enterprise.audits().attach(enterprise.id, (pivot)=> {
            pivot.status = 'uninitiated'
            pivot.assign = date
          })
          return response.ok('Auditoría asignada')
        }          
        } else {
          return response.preconditionFailed('Auditoría no encontrada')
        }
      }else {
        return response.preconditionFailed('Empresa no encontrada')
      }
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la petición')
    }
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
      return response.badRequest('Error en la petición')
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
    try {
      let enterprise = await Enterprise.findBy('user_id',params.id)
      if(enterprise) {
        return response.ok(enterprise)
      }else {
        return response.noContent()
      }
    } catch (error) {
     return response.badRequest('Error en la petición') 
    }
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
    try {
      let enterprise = await Enterprise.findBy('id',params.id)
      if(enterprise) {
        enterprise.name = request.input('name')
        enterprise.industry = request.input('industry')
        enterprise.address = request.input('address')
        enterprise.rfc = request.input('rfc')
        await enterprise.save()
        return response.ok('Empresa actualizada')
      } else {
        return response.noContent()
      }      
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
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
    try {
      let affectedEnterprise  = await Enterprise.query().where('user_id',params.id).del()
      if(affectedEnterprise == 1) {
        return response.ok('Empresa Eliminada')
      } else {
        return response.notFound('Empresa no encontrada')
      }
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }
}

module.exports = EnterpriseController
