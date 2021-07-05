const request = require('postman-request')


const forecast = (lati, long, callback) =>{

    const uri = 'http://api.weatherstack.com/current?access_key=541c6d03d0b72ea9fd5cdb2b9a7f3454&query='+lati+','+long; 

    console.log(uri);


    request( uri, {json : true}, (error, {body}={})=>{
        if(error){
            callback("Unable to connect to server", undefined)
        }else if(body.error){
            callback("Unable to find weather", undefined)
        }else{
            callback(undefined, body)
        }
    })

}


module.exports = forecast