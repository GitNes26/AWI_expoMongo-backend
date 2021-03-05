/*'use strict'

const Product = use('App/Models/Product')
const Comment = use('App/Models/Comment')
const Database = use ('Database')

class CommentController {

    async store({request, response, auth, params}){
        const user = await auth.getUser()
        const comment = request.only(['comment'])
        const id = params
        const product = await Product.find(id)
        const newComment = {
            'comment': comment,
            'user_id': user.id,
            'product_id': product.id
        }
        const comment = new Comment(newComment)
        await comment.save()
        return response.json(comment)

    }

    async index ({ response, params }) {
        const id = params
        const comments = await Comment.find({'product_id':id})

        return response.json(comments)
    }

    async myComments({auth, params, response}){
        const user = await auth.getUser()
        const id = params
        // const products = await Product.find(id)
        const comments = await Comment.find({'product_id':id})

        return response.json(comments)
    }

    async commentsByProduct({params:{id}, response }){
        // const comments = await Comment.select('*').where('product', id ).fetch()
        const comments = await Database.select('comments.comment','users.username','products.product','comments.created_at')
        .table('comments')
        .innerJoin('products','comments.product','products.id')
        .innerJoin('users','comments.user','users.id')
        .where('comments.product',id )
        return response.json(comments)
    }


    async update({request, response, params:{id}}){
        const user = await auth.getUser()
        const newComment = request.only(['comment'])
        const comment = await Comment.findOne({'_id':id})
        const user_id = comment.user_id

        if (user.id == user_id) {
            return await Comment.updateOne({'_id':id},{$set:{'comment':newComment}})
        }  
    }

    async destroy({params:{id}, auth}){
        const user = await auth.getUser()
        const comment = await Comment.findOne({'_id':id})
        const user_id = comment.user_id

        if (user.id == user_id) {
            return await Comment.deleteOne({'_id':id})
        }    
        
    }
}

module.exports = CommentController
*/

'use strict'
const Comment = use('App/Models/Comment')
const Database = use ('Database')

class CommentController {
    async store({request, response, auth}){
        const user = await auth.getUser()
        const comment = new Comment()
        comment.comment = request.input('comment')
        comment.product_id = request.input('product_id')
        comment.user_id = user.id

        if (await comment.save())
            return response.json(comment)
        return response.status(400).send('Error al guardar.')
        // const commentData = request.only(['comment','user','product'])
        // const comment = await Comment.create(commentData)
        // return response.created({
        //     status: true,
        //     data: comment,
        // })
    }

    async commentsBy({params:{id}, response }){
        // const comments = await Comment.select('*').where('product', id ).fetch()
        const comments = await Database.select('comments.comment','users.username','products.title','comments.created_at')
        .table('comments')
        .innerJoin('products','comments.product_id','products.id')
        .innerJoin('users','comments.user_id','users.id')
        .where('comments.product_id',id )
        return response.json(comments)
    }

    async myComments2({auth}){
        const user = await auth.getUser()
        return await user.comments().fetch()
    }

    async index ({ response }) {
        // let comments = await Comment.query().with('user').fetch()
        let comments = await Comment.query().fetch()
        return response.json(comments)
    }

    async update({request, response, params:{id}}){
        const comm = request.input('comment')

        let com = await Comment.find(id)
        
        com.comment = comm
        await com.save()
        
        return response.json(com)
    }

    async destroy({params:{id}}){
        const comment = await Comment.find(id)
        
        await comment.delete()
    }
}

module.exports = CommentController
