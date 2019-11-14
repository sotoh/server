'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AdminSeeder {
  async run () {
    const testAdmin = new User()
    testAdmin.username = 'admin'
    testAdmin.email = 'root@admin.com'
    testAdmin.type = 'admin'
    testAdmin.password = 'admin123'

    await testAdmin.save()
  }
}

module.exports = AdminSeeder
