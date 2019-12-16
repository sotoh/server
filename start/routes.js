'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//Route.get('/','AdminController.create')

/**Login Routes */
Route.post('login', 'AdminController.login')

/**Admin Routes */
Route.group(() => {
  //Auditors
   Route.resource('auditors', 'AuditorController').only(['store','destroy'])
   Route.get('auditors/:page','AuditorController.index')
   Route.get('auditors/enterprises/:id','AuditorController.enterprises')
   Route.patch('auditors/enterprises/assign/:id', 'AuditorController.assign')
   //Enterprises
   Route.resource('enterprises', 'EnterpriseController').only(['store','destroy'])
   Route.get('enterprises/:page','EnterpriseController.index')
   Route.patch('enterprises/audits/assign/:id', 'EnterpriseController.assign')   
   Route.get('enterprises/audits/:id', 'EnterpriseController.audits')
   //Audits
   //Route.resource('audits', 'AuditController').apiOnly()//Removes GET resource/create and GET resource/:id/edit
   Route.post('audits', 'AuditController.store')
   //Route.delete('audits/:id', 'AuditController.destroy')
   Route.get('audits/:page', 'AuditController.index')
   //Route.get('template','AuditController.templateindex')
   Route.get('show', 'AdminController.show').as('admin.show')
}).prefix('admin')//.middleware(['authadmin'])

/**Auditor Routes */
Route.group(() => { 
  Route.resource('auditor', 'AuditorController').except(['index','store','create','destroy','edit'])
  Route.post('auditor/audits/answers/store', 'AuditController.storeAnswer')
  Route.get('auditor/audits/:user_id/:page','AuditorController.audits')   
  Route.get('auditor/questions/:enterprise/:audit','AuditorController.questions')
})//.middleware(['authauditor'])

/**Enduser Routes */
Route.group(() => {
   Route.resource('enterprise', 'EnterpriseController').except(['index','store','create','destroy','edit']) 
   Route.get('enterprise/score/:id','AuditController.score')
   Route.get('enterprise/ofi/:id','AuditController.ofi')
   Route.get('enterprise/audits/:user_id/:page','EnterpriseController.audits')
  })//.middleware(['auth'])
