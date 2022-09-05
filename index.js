const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = ('https://www.theguardian.com/uk')

//app.METHOD(PATH, HANDLER)

app.get('/', function (req , res){
    res.json('This is my webscaper')
}) //get data
// app.post() //add
// app.put() //edit
// app.delete()

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.fc-item__title', html).each(function() {
            const title =$(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))