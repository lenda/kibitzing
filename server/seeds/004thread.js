
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('thread').del()
    .then(function () {
      // Inserts seed entries
      return knex('thread').insert([
        {pdf_id: 1, pdf_location: '1, 2'}
      ]);
    });
};
