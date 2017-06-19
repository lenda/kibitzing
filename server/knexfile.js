// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/kibitzing'
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://ymmsneoiwdasww:2371121fd8d9931652b3b2b8fcc3bf8d2c9615d75e9d2e20bb02da3c303f4aed@ec2-54-243-185-123.compute-1.amazonaws.com:5432/df1c527diagh63'
  }
};
