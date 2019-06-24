const request = require('request');

const geocode = (address,callback) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFuc2kxMSIsImEiOiJjand6NnVrNzEwaTg4M3p0YXZhb2l2Y2RqIn0.NNb3ecPK2q61gMjvRHUVaQ&limit=1`;

   request({url }, (error,{body} = {}) => {
      if(error){
         console.log('cant fetch data  :(');
      }
       else {
         const dat = (JSON.parse(body)).features[0];
         callback(undefined, {
            latitude: dat.center[1],
            logitude : dat.center[0],
            location : dat.place_name
         })
      }
   })
}

module.exports = geocode;