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
    fs.writeFile('meeting.json', JSON.stringify(req.body), (err) => {
      if (err) next(err);
      res.json({ data: true })
    });
  } catch (error) {
    res.json({ error: error.message })
  }  
})

app.get('/meeting', async (req, res, next) => {
  try {
    let data = fs.readFileSync('meeting.json');
    let meeting = JSON.parse(data);
    res.json({ data: meeting })
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})