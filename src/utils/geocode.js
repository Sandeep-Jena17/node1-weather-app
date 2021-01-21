const request=require('request')
const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmVhY3Qtbm9kZS1qczIwMjAiLCJhIjoiY2todzEycjF1MGtlZDMxbW9wbXc3ZHFweCJ9.en8oY1Rqig5PI_331neBBA`;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback(`Unable to connect .Please check your connection`,undefined);
        }else if(response.body.features.length===0){
            callback(`unable to find location.Try another search`);
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name 
            });
        };
    });
};

module.exports=geocode;