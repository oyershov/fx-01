const withModuleFederationConfig = {
  name: 'rates',
  exposes: {
    './Module': './src/app/app.tsx',
  },
}

module.exports = withModuleFederationConfig;
