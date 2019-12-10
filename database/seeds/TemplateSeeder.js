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
      {option:'Interna', value: 67 }, 
      {option:'Externa', value: 0 }, 
      {option:'Ambos', value: 33 }, 
    ])
     
    
    const criteria = await Option.createMany([
       {option:'Obediente', value: 25 }, 
       {option:'Oportunidad de Mejora', value: 50 }, 
       {option:'No Conformidad Menor', value: 75 }, 
       {option:'No Conformidad Mayor', value: 100 }        
      ])


    /**
    * Inicia pregunta
    */
    const isoTemplate = new Audit()
    isoTemplate.isCustom = false
    //isoTemplate.status = 'uninitiated'
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
  * ISO 18001:2007 Internal Audit Checklist
  */
    
    const generalTemplate = new Audit()
    generalTemplate.isCustom = false
    //generalTemplate.status = 'uninitiated'
    generalTemplate.name = 'Requisitos Generales'

    //const user = await User.create(userData)
   //await generalTemplate
    //.questions()
    const templateOneQuestions = await AuditContent.createMany(
    [
      { question: '¿La organización ha establecido, documentado, implementado, mantenido y mejorado continuamente un sistema de gestión de Salud y Seguridad de acuerdo con los requisitos?', type:'options' },
      { question: '¿La organización ha determinado cómo cumplirá estos requisitos?', type:'options' },
      { question: '¿La organización ha determinado y documentado el alcance de su sistema de gestión de Salud y Seguridad?', type:'options' },
      { question: '¿La organización ha establecido una política adecuada de Salud y Seguridad?', type:'options' },
      { question: '¿Ha identificado la organización los riesgos para la salud y la seguridad derivados de sus actividades, productos y servicios pasados, existentes o planificados, a fin de determinar los riesgos significativos para la salud y la seguridad?', type:'options' },
      { question: '¿Ha identificado la organización los requisitos legales aplicables y otros requisitos a los que se suscribe?', type:'options' },
      { question: '¿Ha identificado la organización prioridades y establecido objetivos y metas de Salud y Seguridad apropiados?', type:'options' },
      { question: '¿Ha establecido la organización una estructura y programa (s) para implementar la política y lograr objetivos y cumplir metas?', type:'options' },
      { question: '¿Ha facilitado la organización la planificación, el control, el monitoreo de las acciones preventivas y correctivas, las actividades de auditoría y revisión para garantizar que se cumpla la política y que el sistema de gestión de Salud y Seguridad siga siendo apropiado?', type:'options' },
      { question: '¿La organización es capaz de adaptarse a los cambios en las circunstancias?', type:'options' }
    ])    
    for (const iterator of templateOneQuestions) {      
      await iterator.options().saveMany( criteria )
    }
    //await templateOneQuestions.options().saveMany(criteria)
    await generalTemplate.questions().saveMany(templateOneQuestions)


    const templateTwo = new Audit()
    templateTwo.isCustom = false
    //templateTwo.status = 'uninitiated'
    templateTwo.name = 'Política de Salud y Seguridad'

    const twoQuestion =  await AuditContent.createMany(
    [     
      { question: '¿Está documentada y autorizada la política de Salud y Seguridad de la alta dirección?', type:'options' },
      { question: ' ¿Es la política adecuada a la naturaleza y a la escala de los riesgos de Salud y Seguridad de la organización?', type:'options' },
      { question: '¿Incluye la política un compromiso con la mejora continua?', type:'options' },
      { question: '¿Incluye la política el compromiso de cumplir con la legislación aplicable y otros requisitos a los que se suscribe la organización?', type:'options' },
      { question: '¿Se implementa la política?', type:'options' },
      { question: '¿Se comunica eficazmente la política en la organización y los empleados son conscientes de sus obligaciones de Salud y Seguridad?', type:'options' },
      { question: '¿La política está disponible para todas las partes interesadas?', type:'options' },
      { question: '¿Se revisa periódicamente la política para su idoneidad?', type:'options' }      
    ])
    for (const iterator of twoQuestion) {
      await iterator.options().saveMany( criteria )
    }
    //await twoQuestion.options().saveMany(criteria)
    await templateTwo.questions().saveMany(twoQuestion)

    const templateThree = new Audit()
    templateThree.isCustom = false
    templateThree.name = 'Planeacion'

    const threeQuestion = await AuditContent.createMany([
      { question: '¿Se establece un procedimiento para la identificación de riesgos y la evaluación de riesgos y se define la metodología?', type:'options' },
      { question: '¿Los procedimientos de evaluación de riesgos abarcan las actividades rutinarias no rutinarias; personal que tiene acceso al lugar de trabajo (visitantes, subcontratistas)?', type:'options' },
      { question: '¿Prevé la metodología la clasificación de los riesgos y la identificación de los que han de eliminarse o controlarse?', type:'options' },
      { question: '¿La metodología proporciona información sobre la determinación de los requisitos de las instalaciones, la identificación de las necesidades de capacitación y el desarrollo de controles operativos?', type:'options' },
      { question: '¿Demuestran los resultados de la evaluación de riesgos que todas las actividades e instalaciones fueron cubiertas y se evaluaron los riesgos?', type:'options' },
      { question: '¿El proceso se vincula a los procedimientos de control operativo? (Véase auditorías Implementation & Operation)', type:'options' },
      { question: '¿Se tienen en cuenta los resultados de la identificación de peligros y las evaluaciones de riesgos al establecer los objetivos de Salud y Seguridad?', type:'options' },
      { question: '¿Se establece un procedimiento para identificar y acceder a los requisitos legales?', type:'options' },
      { question: '¿Se identifican requisitos distintos de los requisitos legales?', type:'options' },
      { question: '¿Se mantiene actualizada la información relativa a la legislación aplicable y otros requisitos?', type:'options' },
      { question: '¿Se comunica información relevante sobre requisitos legales y de otro tipo a los empleados y otras partes interesadas?', type:'options' },
      { question: '¿Se han establecido objetivos documentados de Salud y Seguridad para cada función pertinente?', type:'options' },
      { question: '¿Se tienen en cuenta los resultados de la identificación de peligros y las evaluaciones de riesgos al establecer los objetivos de Salud y Seguridad? (Véase preguntas 1-7)', type:'options' },
      { question: '¿Se han establecido los objetivos de Salud y Seguridad y se concuerdan con el compromiso con la mejora continua?', type:'options' },
      { question: '¿Se establecen programas para alcanzar los objetivos de Salud y Seguridad?', type:'options' },
      { question: '¿Están documentados las responsabilidades, los medios y los plazos para alcanzar los objetivos?', type:'options' },
      { question: '¿Se revisan los programas de gestión de la salud y la seguridad a intervalos regulares y previstos?', type:'options' },
      { question: '¿Se modifican los programas de gestión de la salud y la seguridad para hacer frente a las circunstancias cambiantes?', type:'options' },
    ])
    for (const iterator of threeQuestion) {
      await iterator.options().saveMany(criteria )  
    }
    //await threeQuestion.options().saveMany( [criteria] )
    await templateThree.questions().saveMany( threeQuestion )
    /*[{ question: '¿Se toma en cuenta que si un programa requiere privilegios especiales para instalarse o ejecutar?', type:'range' }, 
    { question: 'Los programas de seguridad como antivirus, firewall ¿se mantienen actualizados?', type:'range' },     
    { question: 'De acuerdo a la pregunta anterior, ¿está conforme con el servicio de red compartido?', type:'check' },
    { question: '¿Se verifica de que la base de datos es accesible sólo por los usuarios autorizados, tanto en el lado del cliente como en el servidor?', type:'range' },
    ]*/

  }
}

module.exports = TemplateSeeder
