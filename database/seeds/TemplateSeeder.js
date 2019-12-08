'use strict'

/*
|--------------------------------------------------------------------------
| TemplateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Audit = use('App/Models/Audit')
const AuditContent = use('App/Models/AuditContent')
const Option = use('App/Models/Option')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class TemplateSeeder {
  async run () {

    /**
     * Opciones Predeterminadas
     */
    const custom = await Option.createMany([ 
      {option:'Interna', value: 0 }, 
      {option:'Externa', value: 25 }, 
      {option:'Ambos', value: 50 }, 
    ])
     
    /*
    const default = await Option.createMany([
       {option:'Nunca', value: 0 }, 
       {option:'Rara vez', value: 25 }, 
       {option:'Algunas veces', value: 50 }, 
       {option:'Frecuentemente', value: 75 }, 
       {option:'Siempre', value: 100 }
      ])*/

     const days = await Option.createMany([
        {option:'A diario', value: 100 }, 
        {option:'Cada semana', value: 75 }, 
        {option:'Cada mes', value: 50 }, 
        {option:'Cada 6 meses', value: 25 }, 
        {option:'cada año', value: 0 }
       ])

    /**
    * Inicia pregunta
    */
    const isoTemplate = new Audit()
    isoTemplate.isCustom = false
    isoTemplate.status = 'uninitiated'
    isoTemplate.name = 'Auditoría de Seguridad de Sistema de Información'   
    
    await isoTemplate
    .questions()
    .createMany([
      { question: 'El sistema, ¿está basado en roles (por ejemplo usuarios o grupos)?', type:'check' },
      { question: 'El sistema ¿se asegura que los usuarios no pueden tener acceso a más recursos de lo previsto?', type:'check' },      
      { question: '¿El sistema realiza copias de información?', type:'check' },
      { question: '¿Con qué frecuencia se hace el respaldo del sistema?', type:'range' },
      { question: 'Las medidades de seguridad como validaciones, transacciones y otras ¿ayudan para la prevencion de errores e integridad?', type:'range' },
      { question: '¿El sistema está disponible a través de una red o protocolo de uso compartido?', type:'check' },      
      { question: '¿El  sistema genera registros de actividad (logs)?', type:'range' },
      { question: '¿Se cambian las contraseñas de las cuentas de usuario del sistema con regularidad?', type:'range' },
    ])
    //Question with custom options         
      const question = new AuditContent()
      question.question = 'Para acceder al sistema ¿Se requiere la red interna o externa?'
      question.type = 'options'
      await question.options().saveMany(custom)
      //await question.options().save(custom)
   
    //Sub question sample
    const subquestion = new AuditContent()
    subquestion.question = '¿Se conozce la estructura general de los sistemas de archivo que utilice el sistema (tipos de formatos que se utilice internamente)?'
    subquestion.type = 'check'
    await subquestion.subcontent().createMany( [
      { question: 'Mencione los formatos que se utilizan en el sistema', type:'description' },
    ]) 
    await isoTemplate.questions().saveMany( [ question,subquestion ] )
    
  /**
  * Inicia otra pregunta
  */
    /*
    const generalTemplate = new Audit()
    generalTemplate.isCustom = false
    generalTemplate.status = 'uninitiated'
    generalTemplate.name = 'Auditoría de Seguridad de Sistemas'

   await generalTemplate
    .questions()
    .createMany(
    [
      { question: '', type:'range' },
      { question: '¿Se toma en cuenta que si un programa requiere privilegios especiales para instalarse o ejecutar?', type:'range' }, 
      { question: 'Los programas de seguridad como antivirus, firewall ¿se mantienen actualizados?', type:'range' },     
      { question: 'De acuerdo a la pregunta anterior, ¿está conforme con el servicio de red compartido?', type:'check' },
      { question: '¿Se verifica de que la base de datos es accesible sólo por los usuarios autorizados, tanto en el lado del cliente como en el servidor?', type:'range' },
      { question: '', type:'range' },
      { question: '', type:'range' },
      { question: '', type:'range' },
      { question: '', type:'range' },
      { question: '', type:'range' },
      { question: '', type:'range' },
      { question: '', type:'range' },
    ])*/

  }
}

module.exports = TemplateSeeder
