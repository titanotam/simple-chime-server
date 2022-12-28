const fs = require('fs');
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const port = 8889

app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()

app.post('/meeting', jsonParser, (req, res, next) => {
  fs.writeFile('meeting.json', JSON.stringify(req.body), (err) => {
    if (err) next(err);
    res.send({ data: true })
  });
})

app.get('/meeting', async (req, res, next) => {
  try {
    let data = fs.readFileSync('meeting.json');
    let meeting = JSON.parse(data);
    res.send({ data: meeting })
  } catch (error) {
    next(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})