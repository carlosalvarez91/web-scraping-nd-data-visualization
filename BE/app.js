const express = require('express')
const app = express()
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })


app.get('/', (req, res) => {

    nightmare
    .goto('https://duckduckgo.com')
    .type('#search_form_input_homepage', 'github nightmare')
    .click('#search_button_homepage')
    .wait('#r1-0 a.result__a')
    .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
    .end()
    .then(console.log)
    .catch(error => {
      console.error('Search failed:', error)
    })

    res.send('Hello World!')
    }
)


app.listen(3001, () => console.log('Example app listening on port 3001!'))