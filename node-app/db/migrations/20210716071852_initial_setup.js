exports.up = function(knex){
   return knex.schema.createTable("userlogin", table => {
      table.increments()
      table.string("username")
      table.string("password")
   })
}
exports.down = function(knex){
   return knex.schema.dropTableIfExists("userlogin")
}
