const moduleFederationConfig = {
  name: 'fx',
  remotes: ['store'],
  exposes: {
    './Module': './src/app/app.tsx',
  },
};
module.exports = moduleFederationConfig;
