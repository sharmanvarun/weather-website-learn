const express = require ('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(__filename)

//Define path for express config
const publicDirectorypath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>
{
res.render('index',{
    title:'Weather app',
    name:'Varun the Real nigga'
})
})

app.get('/about',(req,res)=>{
      res.render('about',{
        name:'Varun Sharman A',
        title:'New Weather'
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help title",
        name:"Varun Sharman B"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
        Error:'Please Enter the address' 
        })
    }


geocode(req.query.address,(error,{long,lat,location}={})=>{
    if (error)
    {  
        return res.send({error
            })
    
    }
       
forecast(long,lat, (error, forecastdata) => {
    if (error)
    {
       
        
         return res.send({error
        })
    }
  
     res.send({
        
        Address:req.query.address,
        Location:location,
        forecast:forecastdata
    })
  })
})

})

app.get('/products',(req,res)=>
    {  
        if(!req.query.search)
        {
            return res.send({
                error:"Please Enter a seacrh parameter"}
                )
        }
        console.log(req.query.search)
        res.send({
            products:[]
        })
    }   
)

app.get('/help/*',(req,res)=>{
    res.render('error',{
        name:'help'
    })
})

app.get('/*',(req,res)=>{
    res.render('error'
    )
})

app.listen(3000,()=>{
    console.log("server started on port 3000")
})