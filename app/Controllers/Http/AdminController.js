'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Admin = use('App/Models/User')
//const Auditor = use('App/Models/Auditor')

/**
 * Resourceful controller for interacting with admins
 */
class AdminController {
  /**
   * Attempt to login for all type of users and return token.
   * POST admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async login ({ request, response, auth }) {
    try {
        let user = request.input('useremail','false')
        if(user.includes('@')) {
          let infoUser = await User.findBy('email',user)
          if(infoUser) { //Nulls are validated with in this way. When is null it won't have access to true condition.
            let token = await auth.withRefreshToken().attempt(user,request.input('password'))
            if(token){
              return response.ok({
                id:infoUser.id,
                email:infoUser.email,
                type:infoUser.type,
                username:infoUser.username,
                token:token
              })
            } else {
              response.preconditionFailed('Usuario o Passwords incorrectos')
            }
          } else {
            response.preconditionFailed('Usuario o Passwords incorrectos')
          }
        } else {
         let infoUser = await User.findBy('username',user)         
          if(infoUser) {            
            let token = await auth.authenticator('jwtUsername').withRefreshToken().attempt(user,request.input('password'))
            if(token) {
              return response.ok({
                id:infoUser.id,
                email:infoUser.email,
                type:infoUser.type,
                username:infoUser.username,
                token:token
              })
            } else {
              response.preconditionFailed('Usuario o Passwords incorrectos')
            }
          } 
          else {
            response.preconditionFailed('Usuario o Passwords incorrectos')
          }
        }
        //return response.noContent()
    } catch (error) {
        console.log(error)
    }
}

  /**
   * Show a list of all admins.
   * GET admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //Not used
  } 

  /**
   * Render a form to be used for creating a new admin.
   * GET admins/create
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
   * Create/save a new admin.
   * POST admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params }) {
   //Not used
  }

  /**
   * Display a single admin.
   * GET admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      //await User.findBy('email', '[email protected]')
      let admin = await Admin.findBy('type','admin')
      return response.ok(admin)
    } catch (error) {
      return response.badRequest('Error en la peticion')
    }
  }

  /**
   * Render a form to update an existing admin.
   * GET admins/:id/edit
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
   * Update admin details.
   * PUT or PATCH admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    //Not used
  }

  /**
   * Delete a admin with id.
   * DELETE admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    //Not used
  }

  /**
   * Render a form to be used for creating a new admin.
   * GET admins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    //Not used
  }
  
}

module.exports = AdminController
