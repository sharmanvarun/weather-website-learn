console.log('Client side javascript file is loaded')
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
response.json().then((data)=>{
    console.log(data)
})
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =  document.querySelector('#message-1' )
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{ 
    e.preventDefault()
    const location= search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
if (location)
 {   fetch('http://localhost:3000/weather?address='+location).then((response)=>
{
response.json().then((data)=>{
    if(data.error)
    {
        messageOne.textContent=data.error
    //console.log(data.error)
    }
    else
    {
        messageOne.textContent=data.Location
        messageTwo.textContent=data.forecast.summary
    //console.log(data.Location)
   // console.log(data.forecast)
    }
})
})
 }
 else
 messageOne.textContent='Please Enter a location'
})