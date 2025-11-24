export function jsLoader() {
  return {
    test: /\.(js|jsx)$/, // apply to all JS files
    exclude: /node_modules/, // exclude all files on node_modules
    use: {
      loader: 'babel-loader', // looks at .babelrc
    },
  };
}
