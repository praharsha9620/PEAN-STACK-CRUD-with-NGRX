
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employee_data1').del()
    .then(function () {
      // Inserts seed entries
      return knex('employee_data1').insert([
        { d_id:1, name: 'Rahul', address: '70,xx', email:'x@g.com', state:'TN',city:'Madurai'},
        { d_id:2, name: 'Pradeep', address: '70,xx', email:'x@g.com', state:'TN',city:'Madurai'},
        { d_id:3, name: 'RAm', address: '70,xx', email:'x@g.com', state:'TN',city:'Chennai'}
      ]);
    });
};
