'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.string('comment',255).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('product_id').unsigned().references('id').inTable('products')      
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
