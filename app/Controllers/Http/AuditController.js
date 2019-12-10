'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Audit = use('App/Models/Audit')
/**
 * Resourceful controller for interacting with audits
 */
class AuditController {
  /**
   * Show a list of all audits.
   * GET audits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let audits = await Audit.query().where('isCustom', true).fetch()
      if(audits) {
        return response.ok(audits)
      }else {
        return response.noContent()
      }
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

   /**
   * Show a list of all predefined audits.
   * GET audits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async templateindex ({ request, response, view }) {
    try {
      let audits = await Audit.query().where('isCustom', false).fetch()
      if(audits) {
        return response.ok(audits)
      }else {
        return response.noContent()
      }
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

  /**
   * Render a form to be used for creating a new audit.
   * GET audits/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    //Not used
  }

  /**
   * Create/save a new audit's answer.
   * POST audits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
        
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

  /**
   * Create/save a new audit.
   * POST audits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let custom = request.input('options', 'empty')
      if(custom !== 'empty') {
        return response.ok({message:'istrue'})
      }else {

      }
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

  /**
   * Display a single audit.
   * GET audits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      console.log(params.id)
      let audit = await Audit
      .query()
      .where('id',params.id)
      .with('questions.options')
      .fetch()
      //await audit.questions().fetch()
      return response.ok(audit)
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la peticion')
    }
  }

  /**
   * Render a form to update an existing audit.
   * GET audits/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    //Not used
  }

  /**
   * Update audit details.
   * PUT or PATCH audits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

  /**
   * Delete a audit with id.
   * DELETE audits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
   try {
      let affectedAudit  = await Audit.query().where('user_id',params.id).del()
      //Borrar preguntas
      if(affectedAudit == 1) {
        return response.ok('Auditoría Eliminada')
      } else {
        return response.notFound('Auditor no encontrado')
      }
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }
}

module.exports = AuditController
