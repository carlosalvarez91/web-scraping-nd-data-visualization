const express = require('express')
const app = express()
const $ = require('jquery')

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true, webPreferences: {webSecurity:false}})

//click on each add in order to see the date
//see how many .search_result divs there are, and iterate over them,
// but there is no index so it doesnt know who is next.
app.get('/date',(req, res)=> {
  nightmare
  .goto('http://www.rent.ie/houses-to-let/renting_dublin/page_1/')
  .wait(2000)
  .click('.search_result .sresult_address h2 a') 
  .wait(2000)
  .evaluate(()=>{
    var search_results = []
    result = {}
    result['price'] = $('#smi_main_box div.text h2').text().replace(/\s/g,'')
    result['address'] = $('div.smi_main_top h1').text().replace(/\s/g,'')
    result['date'] = document.querySelector('.description p').innerText.replace('Available from:', '')
    search_results.push(result)
    return search_results
  })
  .end()
  .then(console.log)
  .catch(error=>{
    console.error('error', error)
  })
  res.send('Hello World!')
})

//all adds per page but not showing the date
//get 20 per page, save, next page, same , next page, same...
app.get('/nodate', (req, res) => {

  nightmare
  .goto('http://www.rent.ie/houses-to-let/renting_dublin/page_1/')
  .wait(2000)
  .evaluate(() => {
   var search_results = []
   $('.search_result').each(function(){
     result = {}
     result['area'] = $(this).find('a').text().replace(/\s/g,'')
     result['description'] = $(this).find('h3').text().replace(/\s/g,'')
     result['price'] = $(this).find('h4').text().replace(/\s/g,'')
     search_results.push(result)
   })
   return search_results
  })
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })
  res.send('Hello World!')
  }
)


app.listen(3001, () => console.log('Example app listening on port 3001!'))