
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {email: 'ellie@gmail.com', username: 'ellie', hashed_password: 'hello', photo_url: '1'},
        {email: 'jeremy@gmail.com', username: 'jeremy', hashed_password: 'wilson', photo_url: '2'},
        {email: 'sean@gmail.com', username: 'sean', hashed_password: 'hey', photo_url: '3'}
      ]);
    });
};
