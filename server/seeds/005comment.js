
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('comment').insert([
        {thread_id: 1, user_id: 1, content: 'hello'},
        {thread_id: 2, user_id: 1, content: 'are you there'},
        {thread_id: 3, user_id: 1, content: 'im a fake comment'}
      ]);
    });
};
