const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const config = {
    entry: './src/index.jsx',
    output: {
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
  };

  if (env.production) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
    config.devtool = 'eval';
  }

  return config;
};
