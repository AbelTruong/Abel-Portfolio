import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  devtool: 'eval-source-map',
  entry: {
    'js-global': './js/index.js',
    'js-more-action': './js/moreActions.js',
    'js-blog': './js/blog.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }], '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: 'file-loader?publicPath=../&name=../fonts/[name].[ext]',
      },
      {
        test: /\.(svg|jpg|gif|png|jpeg)$/,
        use: 'file-loader?publicPath=../&name=../img/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: 'dist/', to: '../assets/js' }],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.json'],
  },
};

export default (env, argv) => {
  let mode = argv.mode;

  if (mode === 'development') {
    config.devtool = 'eval-source-map';
  }

  if (mode === 'production') {
    config.devtool = false;
  }

  return config;
};
