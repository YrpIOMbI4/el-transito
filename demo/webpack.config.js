const path = require('path');
console.log('sdsdsd');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/el-transito/src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      //... другие загрузчики
    ],
  },
};
