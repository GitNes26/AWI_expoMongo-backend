// 'use strict'
// const mongoose = use('Mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId
// const Mixed = mongoose.Schema.Types.Mixed

// let comentarios = mongoose.Schema({​​
// comment: {​​ type: String, default: '' }​​,
// user_id: {​​ type: Number, default: '' }​​,
// product_id: {​​ type: Number, default: '' }​​,
// }​​, {​​
// timestamps: true
// }​​)

// module.exports = mongoose.model('comments', comentarios);

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {

    users(){
        return this.belongsTo('App/Models/User')
    
    }

    products(){
        return this.belongsTo('App/Models/Product')

    }
}

module.exports = Comment
