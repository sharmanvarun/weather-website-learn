const request = require('request')

const forecast =(lat,long,callback)=>
{
    const url = 'https://api.darksky.net/forecast/79b2eed83887431e175a353863b81239/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'
    request({ url, json:true} ,(error,{body})=>
    {
        if (error)
        {
            callback("Can't fetch the Api",undefined)
        }
        else if (body.error)
        {
            callback(body.error,undefined)
        }
        else
        {   
            const wData = {
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                precipitation:body.currently.precipProbability
            }   
            callback(undefined,wData)
        }
    }
    )
}
module.exports=forecast