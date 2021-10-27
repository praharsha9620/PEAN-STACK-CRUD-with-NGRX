exports.up = function (knex) {
    return knex.schema.createTable('employee_data1', function (table) {
        table.increments('id');
        table.integer('d_id');
        table.string('name', 255).notNullable();
        table.string('address',255);
        table.string('email',255);
        table.string('state',255);
        table.string('city',255);
        table.timestamps(true,true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('employee_data1');
};
