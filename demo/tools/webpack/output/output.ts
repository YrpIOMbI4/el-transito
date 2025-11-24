import path from 'path';

interface OutputProps {
  folder: string;
}
export function output({ folder }: OutputProps) {
  return {
    path: path.resolve(folder, './dist'),
    pathinfo: true,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'static/[name].[ext]',
    clean: true,
    publicPath: '/',
  };
}
