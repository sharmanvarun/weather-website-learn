const request = require('request')

const geocode = (address,callback)=>
{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hhcm1hbnZhcnVuIiwiYSI6ImNrOGZ1Zng2NjA2cjkzZnF0ZWl2eTNlb2wifQ.FEu3mxkRjcQ1t0PjBgPSfw&limit=1'
    request({url, json:true}, (error, {body}={})=>{
        if(error)
        {
        callback('Unable to connect to location services',undefined)
        }
        else if (body.features.length===0)
         {
             callback("place not found",undefined)
         } 
         else 
         {
             callback(undefined,{
                 location: body.features[0].place_name,
                 lat:body.features[0].center[0],
                 long:body.features[0].center[1]
             })
         }
    }) 
} 
module.exports=geocode