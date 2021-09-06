const express = require('express')
const Gun = require('gun')
const PORT = 4000
const app = express()

app.use(Gun.serve)

const server = app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

  Gun({ web: server });
