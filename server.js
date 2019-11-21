const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/spells', (request, response) => {
  database('spells').select()
  .then((spells) => {
    response.status(200).json(spells);
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})