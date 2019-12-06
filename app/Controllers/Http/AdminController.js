'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
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
    console.log('Iteration');
    try {
        let user = request.input('useremail')        
        if(user.includes('@')) {
          let infoUser = await User.findBy('email',user)
          if(infoUser) { //Nulls are validated with in this way. When is null it won't have access to true condition.
            let token = await auth.withRefreshToken().attempt(user,request.input('password'))
            response.accepted({
              id: infoUser.id,
              username: infoUser.username,
              email: infoUser.email,
              type: infoUser.type,
              token
            })
          } else {
            response.preconditionFailed('Usuario o Passwords incorrectos')
          }   
        } else {
         let infoUser = await User.findBy('username',user)         
          if(infoUser) {            
            let token = await auth.authenticator('jwtUsername').withRefreshToken().attempt(user,request.input('password'))
            response.accepted({
              id: infoUser.id,
              username: infoUser.username,
              email: infoUser.email,
              type: infoUser.type,
              token
            })
          } else {
            response.preconditionFailed('Usuario o Passwords incorrectos')
          }
        }
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
      
    } catch (error) {
      
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
    //response.unauthorized('Unauthorized')
    
  }
  
}

module.exports = AdminController
