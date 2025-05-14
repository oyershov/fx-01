const withModuleFederationConfig = {
  name: 'rates',
  remotes: ['store'],
  exposes: {
    './Module': './src/app/app.tsx',
  },
}

module.exports = withModuleFederationConfig;
