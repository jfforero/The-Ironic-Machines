const express = require('express')
const path = require('path')
const Sentiment = require('sentiment')

const port = 3000
const app = express()

// Minimal CORS so `public/` can be served from another port (e.g. python http.server)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(express.static(path.join(__dirname, 'public/pd')))

app.get('/emotion', function(req, res) {
  const sentiment = new Sentiment()
  const text = req.query.text
  const score = sentiment.analyze(text)

  // Defensive: ensure CORS header is present even if middleware order changes.
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(score)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
