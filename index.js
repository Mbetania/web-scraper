const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = ('https://www.0223.com.ar/')

//app.METHOD(PATH, HANDLER)

app.get('/', function (req , res){
    res.json('This is my webscaper')
}) //get data

app.get('/results', (req, res) =>{
    axios(url)
        .then(response => {
            const html = response.data
            console.log(html)
            const $ = cheerio.load(html)
            const articles = []
            $('.nota__titulo-item', html).each(function() {
                const title =$(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            // console.log(articles)
            res.json(articles)
        }).catch(err => console.log(err))

})
// app.post() //add
// app.put() //edit
// app.delete()



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))