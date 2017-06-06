
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('folder').del()
    .then(function () {
      // Inserts seed entries
      return knex('folder').insert([
        {path: '/'},
        {path: '/state-law'},
        {path: '/state-law/important'}
      ]);
    });
};
