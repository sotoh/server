'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Audit = use('App/Models/Audit')
const AuditContent = use('App/Models/AuditContent')
const Enterprise = use('App/Models/Enterprise')
const Database = use('Database')
const Answer = use('App/Models/Answer')

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
  async index ({params, request, response, view }) {
    try {
      let audits = await Audit
      .query()
      .with('questions')
      .paginate(params.page, 5)
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
   * Create/save a new audit's answer.
   * POST audits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeAnswer ({ request, response }) {
    try {
      let answers = request.input('answers', []);
      let audit = request.input('audit', 0)
      let enterprise = await Enterprise.findBy('id',request.input('enterprise', 0))
      let date = request.input('date')
      if(enterprise) {
        //Actualizar el estado de la auditoria como completado
        //console.log(answers)
        await Database
        .raw('update audit_enterprises SET status = ?, assign = ? WHERE enterprise_id = ? AND audit_id = ?',
         ['completed',date, enterprise.id, audit])
        
         /*await enterprise
        .audits()
        .pivotQuery()
        .where('id',audit)
        .update({ status:'completed'})*/

        //Subir las Respuestas
        if(answers.length !=0) {
          if(date) {
            var amount = 0;
          for (const iterator of answers) {
            switch(iterator.type) {
              case 'iso': {
                let newAnswer = new Answer()
                  newAnswer.value = iterator.value
                  newAnswer.option = iterator.option
                  newAnswer.ofi = iterator.ofi 
                  await newAnswer.save()
                  await newAnswer.questions().attach(iterator.question, (pivot) => {
                    pivot.enterprise = enterprise.id
                    pivot.dateaudit = date
                  })
              } break;
              case 'default': {
                let newAnswer = new Answer()
                newAnswer.value = iterator.value
                newAnswer.option = iterator.option
                newAnswer.ofi = iterator.ofi 
                await newAnswer.save()
                await newAnswer.questions().attach(iterator.question, (pivot) => {
                  pivot.enterprise = enterprise.id
                  pivot.dateaudit = date
                })
              } break;
              case 'true/false': {
                let newAnswer = new Answer()
                newAnswer.value = iterator.value
                newAnswer.option = iterator.option
                newAnswer.ofi = iterator.ofi 
                await newAnswer.save()
                await newAnswer.questions().attach(iterator.question, (pivot) => {
                  pivot.enterprise = enterprise.id
                  pivot.dateaudit = date
                })
              } break;
              case 'description': {
                let newAnswer = new Answer()
                newAnswer.observations = iterator.observations
                newAnswer.value = iterator.value
                newAnswer.option = iterator.option
                newAnswer.ofi = iterator.ofi 
                await newAnswer.save()
                await newAnswer.questions().attach(iterator.question, (pivot) => {
                  pivot.enterprise = enterprise.id
                  pivot.dateaudit = date
                })
              } break;
            } 
          }   
          return response.ok('Terminado')
          } else {
            return response.preconditionFailed('Error, debera reiniciar el proceso de las auditorías')
          }
        } else {
          return response.preconditionFailed('No respuestas contestadas')
        }
      }else {
        return response.preconditionFailed('No existe la Empresa')
      }
    } catch (error) {
      console.log(error);
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
      let audit = new Audit()
      audit.name = request.input('name', 'Default')
      audit.isCustom = true
      let questions = await AuditContent.createMany( request.input('questions', 'Nothing'))
      await audit.questions().saveMany(questions)
      //await audit.questions().createMany( [request.input('questions', 'Nothing')])
      return response.created('Auditoria Creada')
    } catch (error) {
      console.log(error)
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
   * Retrieve Answers.
   * GET audits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async ofi ({ params, request, response }) {
    try {
      let date = request.input('date', 0)
      let audit = request.input('audit', 0)
      let enterprise = await Enterprise.findBy('id',params.id)
      if(enterprise) {
      if(date) {
        let resp = await Answer.query()
        .select('answers.value','answers.ofi')
        .innerJoin('answers_questions','answers.id','answers_questions.answer_id')
        .innerJoin('audit_contents','answers_questions.audit_content_id','audit_contents.id')        
        .where('audit_contents.audit_id', audit )
        .where('answers_questions.dateaudit',date)        
        .where('answers_questions.enterprise', enterprise.id)
        .fetch()
        if(resp) {
          return response.ok(resp)
        } else {
          return response.noContent()
        }
      } else {
        return response.preconditionFailed('Error en la peticion: Fecha')
      } 
      } else {
        return response.preconditionFailed('Empresa no encontrada')
      }     
    } catch (error) {
      console.log(error)
      return response.badRequest('Error en la peticion')
    }
  }

   /**
   * Retrieve Answers.
   * GET audits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async score ({ params, request, response }) {
    try {
      let date = request.input('date', 0)
      let audit = request.input('audit', 0)
      let enterprise = await Enterprise.findBy('id',params.id)
      if(enterprise) {
      if(date) {        
        let resp = await Answer.query()
        .innerJoin('answers_questions','answers.id','answers_questions.answer_id')
        .innerJoin('audit_contents','answers_questions.audit_content_id','audit_contents.id')        
        .where('audit_contents.audit_id', audit )
        .where('answers_questions.dateaudit',date)        
        .where('answers_questions.enterprise', enterprise.id)
        .avg('answers.value')
        if(resp) {
          return response.ok(resp[0].avg)
        } else {
          return response.noContent()
        }
      } else {
        return response.preconditionFailed('Error en la peticion: Fecha')
      } 
      } else {
        return response.preconditionFailed('Empresa no encontrada')
      }     
    } catch (error) {
      console.log(error)
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
    /*const user = await User.find(1)
    await user
    .cars()
    .where('name', 'mercedes')
    .delete()*/
      let audit = await Audit.findBy('id',params.id)
      await audit.questions().delete()
      let affectedAudit  = await Audit.query().where('id',params.id).del()
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
