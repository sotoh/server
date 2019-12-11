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
   Route.resource('auditors', 'AuditorController').only(['store','destroy'])
   Route.get('auditors/:page','AuditorController.index')
   Route.resource('enterprises', 'EnterpriseController').only(['store','destroy'])
   Route.get('enterprises/:page','EnterpriseController.index')
   Route.get('show', 'AdminController.show').as('admin.show')
   Route.resource('audits', 'AuditController').apiOnly()//Removes GET resource/create and GET resource/:id/edit
   Route.patch('auditors/assign/:id', 'AuditorController.assign')
   Route.patch('enterprises/assign/:id', 'EnterpriseController.assign')
   Route.get('template','AuditController.templateindex')
}).prefix('admin')//.middleware(['authadmin'])

/**Auditor Routes */
Route.group(() => { 
  Route.resource('auditor', 'AuditorController').except(['index','store','create','destroy','edit'])
})//.middleware(['authauditor'])

/**Enduser Routes */
Route.group(() => {
   Route.resource('enterprise', 'EnterpriseController').except(['index','store','create','destroy','edit']) 
  })//.middleware(['auth'])
