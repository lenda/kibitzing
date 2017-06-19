
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('thread').del()
    .then(function () {
      // Inserts seed entries
      return knex('thread').insert([
        {pdf_id: 1, pdf_location: '1, 2'},
        {pdf_id: 2, pdf_location: '1, 3'},
        {pdf_id: 2, pdf_location: '3, 5'}
      ]);
    });
};
