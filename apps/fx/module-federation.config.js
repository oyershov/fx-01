const moduleFederationConfig = {
  name: 'fx',
  exposes: {
    './Module': './src/app/app.tsx',
  },
};
module.exports = moduleFederationConfig;
