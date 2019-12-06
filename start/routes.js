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
   Route.resource('auditors', 'AuditorController').only(['index','store','destroy'])
   Route.resource('enterprises', 'EnterpriseController').only(['index','store','destroy'])
   Route.get('/:id', 'AdminController.show').as('admin.show')
   Route.put('/:id', 'AdminController.update').as('admin.update')
   Route.patch('/:id', 'AdminController.update').as('admin.update')
   Route.resource('audits', 'AuditController').apiOnly()
   Route.get('template','AuditController.templateindex')
}).prefix('admin')//.middleware(['authadmin'])

/**Auditor Routes */
Route.group(() => { 
  Route.resource('auditor', 'AuditorController').except(['index','store','create','destroy'])
}).middleware(['authauditor'])

/**Enduser Routes */
Route.group(() => {
   Route.resource('enterprise', 'EnterpriseController').except(['index','store','create','destroy']) 
  }).middleware(['auth'])
