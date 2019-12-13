'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Auditor = use('App/Models/Auditor')
const Audit = use('App/Models/Audit')
const User = use('App/Models/User')
const Enterprise = use('App/Models/Enterprise')
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
  async index ({ params, request, response, view }) {
    try {
      /*let auditors = await Auditor
      .query()
      .with('external')
      .with('user')
      .forPage(params.page, 10)
      .fetch()*/
      let auditors = await Auditor
      .query()
      .with('external')
      .with('user')
      .paginate(params.page, 10)
      if(auditors){
        return response.ok(auditors)
      } else {
        return response.noContent()
      }
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

   /**
   * Show Audistor's Audits.
   * GET auditors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async audits ({ request, response, params }) {
    try {
      let auditor = await Auditor.findBy('id',params.id)
      if(auditor) {
        let audits = await Auditor
      .query()
      .where('id',params.id)
      .with('enterprises.audits')
      .fetch()
      //await auditor.loadMany(['enterprises', 'audits','questions']) <-- Only allow loading those methods in the Model
      let resp = audits.toJSON()          
      var auditResp = []
      for (const iterator of resp[0].enterprises) {
        console.log(iterator.audits)
        auditResp.push(iterator.audits)
      }
      return response.ok(auditResp)
    } else {
      return response.preconditionFailed('Auditor no encontrado')
    }
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la peticion')
    }
  }

  /**
   * Show Audistor's Audits.
   * POST auditors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async answers ({ request, response, params }) {
    try {
      let auditor = await Auditor.findBy('id',params.id)
      if(auditor) {
        let audits = await Auditor
      .query()
      .where('id',params.id)
      .with('enterprises.audits')
      .fetch()
      //await auditor.loadMany(['enterprises', 'audits','questions']) <-- Only allow loading those methods in the Model
      let resp = audits.toJSON()          
      var auditResp = []
      for (const iterator of resp[0].enterprises) {
        console.log(iterator.audits)
        auditResp.push(iterator.audits)
      }
      return response.ok(auditResp)
    } else {
      return response.preconditionFailed('Auditor no encontrado')
    }
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la peticion')
    }
  }

  
   /**
   * Show Audistor's Questions.
   * GET auditors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async questions ({ request, response, params }) {
    try {
      let audit = await Audit.findBy('id',params.id)
      if(audit) {
        let questions = await audit.questions().fetch()    
      ///let resp = .toJSON()           
      return response.ok(questions)      
    } else {
      return response.preconditionFailed('Auditoría no encontrado')
    }
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la peticion')
    }
  }
  
   /**
   * Show Audistor's Enterprises.
   * GET auditors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async enterprises ({ request, response, params }) {
    try {
      let auditor = await Auditor.findBy('id',params.id)
      if(auditor) {
      let enterprises = await auditor.enterprises().fetch()
      if(enterprises){
        return response.ok(enterprises)
      } else {
        return response.noContent()
      }
    } else {
      return response.preconditionFailed('Auditor no encontrado')
    }
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

   /**
   * Asign Enterprise to Auditor.
   * PUT or PATCH auditor
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async assign ({ request, response, params }) {
    try {
      var equal = false;
      var auditor = await Auditor.findBy('id',params.id)
      let identerprise = request.input('enterprise',0)
      if(auditor) {
        let enter = await auditor.enterprises()
        .where('enterprise_id', identerprise)
        .fetch()
        let relatedEnterprise =  enter.toJSON()
        for (const iterator of relatedEnterprise) {
          if(iterator.id==identerprise) {
            equal = true
          }
        }
        if(equal) {
          return response.preconditionFailed('La empresa ya está asignada a ese Auditor')
        } else {
          let enterprise = await Enterprise.findBy('id',request.input('enterprise',0))
          if(enterprise) {
            let date = request.input('date',undefined)
            if(!date) {
              console.log(date)
              return response.badRequest('Error en la petición: fecha')
            } else {           
              await auditor.enterprises().attach(enterprise.id, (pivot)=> {
                pivot.assign = date
              })
              return response.ok('Auditor asignado')
            }          
          } else {
            return response.preconditionFailed('Empresa no encontrada')
          }
        }
      }else {
        return response.preconditionFailed('Auditor no encontrado')
      }
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la petición')
    }
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
      return response.badRequest('Error en la petición')
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
    try {
      console.log(params)
      let auditor = await Auditor.findBy('user_id',params.id)
      //let admin = await User.findBy('type','admin')
      if(auditor) {
        return response.ok(auditor)
      }else {        
        return response.noContent()        
      }
    } catch (error) {
      console.log(error)
     return response.badRequest('Error en la petición') 
    }
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
    try {
      let auditor = await Auditor.findBy('id',params.id)
      let external = request.input('external', auditor.isExternal)
      if(auditor) {
        auditor.name = request.input('name')
        auditor.lastname = request.input('lastname')
        auditor.gender = request.input('gender')
        if(external) {
          auditor.isExternal = external
        }
      } else {
        return response.noContent()
      }      
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
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
    try {
      console.log(params)     
      let userdeleted = await User.query().where('id',params.id).delete()
      if(userdeleted ===1) {
        return response.ok('Auditor Eliminado')
      } else {
        return response.notFound('Auditor no encontrado')
      }
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la peticion')
    }
  }
}

module.exports = AuditorController
