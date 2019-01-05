var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var schema = require('./schema/schema');


var root = { hello: () => 'Hello world!' };


const compiler = webpack({
  mode: 'development',
  entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: '/',
  },
});
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  stats: { colors: true },
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(5000, () => console.log('Now browse to localhost:4000/graphql'));