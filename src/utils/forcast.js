const request = require("request");

//const request=require("request");

const forcast=(latitude,longitude,callback)=>{
 const url=`http://api.weatherstack.com/current?access_key=c548fbf2bfe9142ecf3873789034cb57&query=${latitude},${longitude}`;
 request({url,json:true},(error,{body})=>{
    if(error){
        callback(`Unable to connect please check your connection`,undefined)
    }else if(body.error){
            callback(`unable to find location`,undefined);
    }else{
        callback(undefined,body.current.weather_descriptions[0] +" "+'it is currently' +body.current.temperature+" "+"degree out"+" "+body.current.precip +" "+"% chance of rain");
    };
 });
};

module.exports=forcast;

