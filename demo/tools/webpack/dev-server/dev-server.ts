import { Configuration } from 'webpack-dev-server';

export function devServer(): Configuration | undefined {
  return {
    host: '0.0.0.0',
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
      },
    },
    port: 3000, //given port to exec. app
    open: false, // open new tab
    hot: true, // Enable webpack's Hot Module Replacement
  };
}
