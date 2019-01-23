const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'script.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    port: 9000
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        //exclude: /index\.html$/, //without this HtmlWebPackPlugin will not work with template file correctly
        include: path.join(__dirname, 'src/html'),
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
              interpolate: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader', options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                require("autoprefixer")()
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'img/'
          }
        }
      },
      {
        test: /\.(pdf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/'
          }
        }
      },
      {
        test: /\.(ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: './'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Title',
      template: "./src/html/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
      { from: 'src/assets', to: 'assets' }
    ]),
    new WebpackPwaManifest({
      name: 'HILO',
      description: 'Contemporary art gallery representing emerging artists from Latin America',
      orientation: "omit",
      ios: true,
      icons: [
        {
          src: path.resolve('src/img/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          ios: true
        }
      ]
    })
  ]
};