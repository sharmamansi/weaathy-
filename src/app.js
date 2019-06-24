const path = require('path')
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
//import blahh from '././src/app.js';
//const blahh = require('../public/js/app.js')

const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(path.join(__dirname, '../public')))

//PAHAR
let pahar = 'default'

app.get('',(req,res) => {
    res.render('index',{
        title: 'Whether',
        name: 'Mansi Sharma'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me' ,
        name: 'Mansi sharma'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        help: 'its a help text',
        title: 'Help',
        name: 'Mansi Sharma'
    })
})


app.get('/whether',(req,res) =>{

    if(!req.query.address){
        return res.send({
            error: 'oops.'})
    }

   

   geocode(req.query.address,(error,{latitude,logitude,location}= {}) => {
    if(error){
            return res.send({error})
    }
      forecast(latitude,logitude,(error,data) => {
        if(error){
           return res.send({error})
        }
        console.log(data);

        pahar = forecast.pahar;

        res.send({
           forecast: data,
           location,
           address: req.query.address
         
         } )
    
      })
   })
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search'
        })
    }

      res.send({
     products:[]
 })
})

app.get('/help/*',(req,res) => {
    res.render('extra',{
        title: 'Oops  ',
        name: 'Mansi Sharma',
        content: 'Help article not found'
    })
})

app.get('*',(req,res) => {
res.render('extra',{
    title: 'Oops',
        name: 'Mansi Sharma',
    content: 'Page not found'
})
})

//console.log(blahh);

app.listen(port, () => {
    console.log('server started' + port);
}) 
