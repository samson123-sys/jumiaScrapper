const { request, response } = require('express');
const express = require('express');
const requestProm = require('request-promise');

const app = express()

const PORT = process.env.PORT || 5000;

//const apiKey = '795b9353ae2b8404c0a0849bf3107f5d';
//const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Welcome to jumia Scrapper API')
});

// GET Product details

app.get('/products/:productId', async (req, res) => {
      const { productId } = req.params
      const { api_Key } = req.query
      try {
          const response = await requestProm(`${generateScraperUrl(api_Key)}&url=https://www.amazon.com/dp/${productId}`)
          res.json(JSON.parse(response))
        
      } catch (error) {
          res.json(error)
      }
})
// GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async (req ,res) =>{
    const {productId} = req.params
    const {api_Key} = req.query
  
    try {
        const response = await requestProm(`${generateScraperUrl(api_Key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)
    }
})
// GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req ,res) =>{
    const {productId} = req.params
    const {api_Key} = req.query
  
    try {
        const response = await requestProm(`${generateScraperUrl(api_Key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)
    }
})

// GET SEARCH RESULTS
app.get('/search/:searchQuery', async (req ,res) =>{
    const {searchQuery} = req.params
    const {api_Key} = req.query
  
    try {
        const response = await requestProm(`${generateScraperUrl(api_Key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})