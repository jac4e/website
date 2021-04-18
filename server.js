"use strict";
import express from 'express';
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import api from './server/api.controller.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// api routes
app.use('/api', api);

// app route
app.use(express.static(`${__dirname}/dist/website`))
app.get('/', (req,res) => {
  res.sendFile('/dist/website/index.html',{root: __dirname})
});
app.get('/*', (req,res) => {
  res.sendFile('/dist/website/index.html',{root: __dirname})
});

// start server
app.set('port', 3000)
app.listen(3000, () => console.log('Backend listening on port ' + app.get('port')));