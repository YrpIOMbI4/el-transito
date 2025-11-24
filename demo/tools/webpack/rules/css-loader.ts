export const cssLoader = () => {
  return {
    test: /\.css$/i,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true,
          modules: {
            auto: /\.m\.css$/i,

            localIdentName: '[folder]__[local]-[hash:6]',
            exportLocalsConvention: 'camel-case',
            exportGlobals: true,
          },
          esModule: false,
        },
      },
    ],
  };
};
