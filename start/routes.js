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
   Route.resource('auditors', 'AuditorController').only(['index','store'])
   Route.resource('users', 'UsersController').only(['index','store'])
   Route.get('/:id', 'AdminController.show').as('admin.show')
   Route.put('/:id', 'AdminController.update').as('admin.update')
   Route.patch('/:id', 'AdminController.update').as('admin.update')
   Route.resource('audits', 'AuditController').apiOnly() 
}).prefix('admin').middleware(['authadmin'])

/**Auditor Routes */
Route.group(() => { 
  Route.resource('auditor', 'AuditorController').except(['index','store'])
}).middleware(['authauditor'])

/**Enduser Routes */
Route.group(() => { 
  Route.resource('user', 'UserController').except(['index','store'])
}).middleware(['auth'])

