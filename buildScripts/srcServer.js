import express from 'express';
import path from 'path'; //global access to path set in Node
import open from 'open';
import webpack from 'webpack';
// import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express()
const compiler = webpack(config); //new webpack compiler

//Tell express to use the webpack middleware
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath //use the publicPath in our config
}));

app.get('/', function (req, res) {
    //res.send('Hello World!')
    res.sendFile(path.join(__dirname, '../src/index.html'));
})

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
    {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
