const express = require('express')
const path = require('path');
const hbs = require('hbs')


const { title } = require('process');
const geoCode = require('../utils/geocode');
const forecast = require('../utils/forecast')

const app = express();
const port = process.env.PORT || 3000

const pathDirectory = path.join(__dirname, '../public')
const pathTemplate = path.join(__dirname, '../template/partials')
const pathD = path.join(__dirname, '../template/views')
//app.com
//app.com/about
//app.com/help


hbs.registerPartials(pathTemplate)

app.use(express.static(pathDirectory))
app.set('view engine', 'hbs')
app.set('views', pathD )


app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'Rajesh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About Us',
        name : 'Rajesh B',
        image : '/image/download.png'
    })
})

app.get('/help', (req, res)=>{

    res.render('help', {
        title : 'Help',
        name : 'Rajesh B'
    })
    

})


app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error : 'No search tearm found '
        })
    }

    console.log(req.query.search);

    res.send({
        product: []
    })

})

app.get("/weather", (req, res)=>{

    if(!req.query.address){
        return res.send('provide address')
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
           return res.send({
                error: error
            })
        }
            forecast(latitude, longitude, (error, data)=>{
                if(error){
                    res.send({
                        error: error
                    })
                }else{
                   res.send({
                       data : 'Its currently'+ data.current.temperature +' degrees out.'+'But its feel like'+data.current.feelslike+' in '+ data.location.name
                   })
                }
            })
        
    })

})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title : 'help',
        error : 'no help guide found for this page'
    })
})


app.get("*", (req, res)=>{
    res.render('404',{
        title : 404,
        error : 'page Not found'
    })
})


app.listen(port, ()=>{
    console.log('Server starts at '+port+' port')
})