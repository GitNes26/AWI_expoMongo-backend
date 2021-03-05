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

//
Route.post('register', 'AuthController.register')
Route.post('login', 'AuthController.login')

Route.get('perfil', 'UserController.getUser').middleware(['auth'])

/* Rutas Productos */
Route.get('products', 'ProductController.index')
Route.post('products', 'ProductController.store').middleware(['auth'])
Route.put('products/:id', 'ProductController.update').middleware(['auth'])
Route.delete('products/:id', 'ProductController.destroy').middleware(['auth'])
Route.get('myProducts', 'ProductController.myProducts').middleware(['auth'])
Route.get('product/:id', 'ProductController.getProduct').middleware(['auth'])

/* Rutas Comentarios */
Route.get('comments', 'CommentController.index').middleware(['auth'])
// Route.get('comments/:id', 'CommentController.commentsBy').middleware(['auth'])
Route.post('comments','CommentController.store').middleware(['auth'])
Route.delete('comments/:id','CommentController.destroy').middleware(['auth'])
Route.put('comments/:id','CommentController.update').middleware(['auth'])
Route.get('myComments', 'CommentController.myComments2').middleware(['auth'])
