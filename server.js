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
  try {
    fs.writeFile('/tmp/meeting.json', JSON.stringify(req.body), (err) => {
      if (err) next(err);
      res.json({ data: true })
    });
  } catch (error) {
    next(error);
  }
})

app.get('/meeting', async (req, res, next) => {
  try {
    let data = fs.readFileSync('/tmp/meeting.json');
    let meeting = JSON.parse(data);
    res.json({ data: meeting })
  } catch (error) {
    next(error);
  }
})

app.delete('/meeting', async (req, res, next) => {
  try {
    var filePath = '/tmp/meeting.json';
    fs.unlinkSync(filePath);
    res.json({ data: true })
  } catch (error) {
    next(error);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})