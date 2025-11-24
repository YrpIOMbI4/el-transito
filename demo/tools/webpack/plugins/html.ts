import HtmlWebpackPlugin from 'html-webpack-plugin';

export function html(): HtmlWebpackPlugin {
  return new HtmlWebpackPlugin({
    template: 'public/index.html',
    inject: true,
  });
}
