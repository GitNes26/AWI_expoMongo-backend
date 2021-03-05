'use strict'
const Product = use('App/Models/Product')

class ProductController {

    async store({request, response, auth}){
        const user = await auth.getUser()
        const {title, description} = request.all()

        const product = new Product
        product.title = title
        product.description = description
        product.user_id = user.id

        product.save()
        return response.json(product)
    }

    async index({response}){
        let products = await Product.query().fetch()
        return response.json(products)
    }

    async getProduct({response, params:{id}}){
        const product = await Product.find(id)
        return response.json(product)
    }

    async myProducts({auth}){
        const user = await auth.getUser()
        return await user.products().fetch()
    }

    async update({request, response, params:{id}, auth}){
        const user = await auth.getUser()
        const description = request.all()

        const prod = await Product.find(id)
        
        // prod.description = description
        prod.merge(request.only('description'))

        prod.save()
        
        return response.json(prod)
    }

    async destroy({params:{id}}){
        const product = await Product.find(id)
        
        await product.delete()
    }
}

module.exports = ProductController
