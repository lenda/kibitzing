
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pdf').del()
    .then(function () {
      // Inserts seed entries
      return knex('pdf').insert([
        {folder_id: 3, path: '/state-law/important/HDMAguidlines', url: 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/2013hmda-guide.pdf'},
        {folder_id: 2, path: '/state-law/resume', url: 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/EleanorsResume.pdf'}
      ]);
    });
};
