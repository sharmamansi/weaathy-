const request = require('request');
const moment = require('moment-timezone');
    

const getData = (hour,minute,status) => {
    let Hour=hour;
    if(minute>=30 && Hour !== 12){
        Hour++;
    }
    if(status==='pm'){
        if(Hour !== 12){
            Hour=Hour+12;
        }else if(Hour == 12){
            Hour=12;
        }
    
    
    }if(status == 'am'){
        if(Hour == 12){
            Hour = 0;
        }
    }
return Hour;
}




let getFinal = (sunrise,sunset,cur) => {
    let hope='';
    if(sunrise<cur && cur<=10){
        hope = 'morning';
    }else if(10<cur && cur<=16){
        hope = 'day';
    }else if(16<cur && cur<=sunset){
        hope = 'evening';
    }else{
        hope = 'night';
    }
    return hope;
}



const getTemp = (raw) => {
    const fl = (raw-32)*(5/9);
    const g = (fl.toString()).split('.');
    const dec = g[1].slice(0,2);
    const tar = g[0]+'.'+dec;
    return tar;
}
const getRainy = (data) =>{
    const cloudy = data.search('Cloudy');
    const overcast = data.search('Overcast');
    const partlycloudy = data.search('Partly Cloudy');
    const strom = data.search('Strom');
    const thunder = data.search('Thunder');
    const lightning = data.search('Lightning');
    const sandstrom = data.search('Windy');
    const lightrain = data.search('Light Rain');
    const drizzle = data.search('Drizzle');
    const showers = data.search('Showers');
    const rain = data.search('Rain')

    let pic = 'false';
    if(cloudy!==-1 || overcast!==-1 || partlycloudy !== -1){
        pic ='cloudy';
    }else if(strom!==-1 || thunder!==-1 || lightning !== -1 || sandstrom !== -1){
        pic ='light';
    }else if(lightrain!==-1 || drizzle!==-1 || showers!== -1){
        pic = 'drizzle';
    }else if(rain !== -1){
        pic = 'rain';
    }
return pic;
}

const getType = (status,summary,type = 'rain') => {
    let initial;
    if(status === 'morning'){
         initial = getRainy(summary);
         if(initial){

            if(initial === 'cloudy'){
                return 'daycloudy';
            }else if (initial === 'light' || initial === 'Drizzle'){
                return initial ;
            }else if(initial == 'rain'){
                if(type == 'snow'){
                    return 'snow'
                }else{
                   return initial;
                }
           }
   

         }
         
        return 'morning';
    }else if(status === 'day'){
        initial = getRainy(summary);
        if(initial){

           if(initial === 'cloudy'){
               return 'daycloudy';
           }else if (initial === 'light' || initial === 'drizzle'){
               return initial ;
           }else if(initial == 'rain'){
                if(type == 'snow'){
                    return 'snow'
                }else{
                   return initial;
                }
           }
  

        }
        
       return 'day';
   }else if(status === 'evening'){
    initial = getRainy(summary);
    if(initial){

       if(initial === 'cloudy'){
           return 'daycloudy';
       }else if (initial === 'light' || initial === 'drizzle'){
           return initial ;
       }else if(initial == 'rain'){
        if(type == 'snow'){
            return 'snow'
        }else{
           return initial;
        }
   }


    }
    
   return 'evening';
    }
    else if(status === 'night'){
        initial = getRainy(summary);
        if(initial){
    
           if(initial === 'cloudy'){
               return 'night cloudy';
           }else if (initial === 'light' || initial === 'drizzle'){
               return initial ;
           }else if(initial == 'rain'){
            if(type == 'snow'){
                return 'snow'
            }else{
               return initial;
            }
       }
    
    
        }
        
       return 'night';
        }
}

 


const forecast = (lat,long,callback) => {

    const url = `https://api.darksky.net/forecast/956c2850f39eed155278ebe1d5d540a7/${lat},${long}`;

    request({
        url,json:true
    },(error,{body}={}) =>{
        if(error){
          callback('error while forecasting :(');
        }else{
            const Timezone= body.timezone;
         // const local =getSpec('nope',Timezone).toString();
         const local ={
            Hour: parseInt((moment.tz(Timezone).format('h')).toString()),
            Minute: parseInt((moment.tz(Timezone).format('mm')).toString()),
            Status: (moment.tz(Timezone).format('a')).toString(),
            Time: (moment.tz(Timezone).format('h:mm:ss a')).toString(),
            }
           const sunriseUNIX = body.daily.data[0].sunriseTime;
           const sunsetUNIX = body.daily.data[0].sunsetTime;
           const rise ={
            Hour: parseInt((moment.unix(sunriseUNIX).tz(Timezone).format('h')).toString()),
            Minute: parseInt((moment.unix(sunriseUNIX).tz(Timezone).format('mm')).toString()),
            Status: (moment.unix(sunriseUNIX).tz(Timezone).format('a')).toString(),
            Time: (moment.unix(sunriseUNIX).tz(Timezone).format('h:mm:ss a')).toString(),
            }
            const set ={
                Hour: parseInt((moment.unix(sunsetUNIX).tz(Timezone).format('h')).toString()),
                Minute: parseInt((moment.unix(sunsetUNIX).tz(Timezone).format('mm')).toString()),
                Status: (moment.unix(sunsetUNIX).tz(Timezone).format('a')).toString(),
                Time: (moment.unix(sunsetUNIX).tz(Timezone).format('h:mm:ss a')).toString(),
                }
         
            
        const sunriseDisp = getData(rise.Hour,rise.Minute,rise.Status);
        const sunsetDisp = getData(set.Hour,set.Minute,set.Status);
       const curDisp = getData(local.Hour,local.Minute,local.Status);
       // getFinal(sunriseDisp,sunsetDisp,curDisp);
  
            const data = body.currently;
            const pahar = getFinal(sunriseDisp,sunsetDisp,curDisp);

           const temp = getTemp(data.temperature);

           const huftype = getType(pahar,data.summary,data.precipType)

        

    
            callback(undefined,  {
                sunrise : rise.Time,
                sunset : set.Time,
                pressure: data.pressure,
                pp: data.precipProbability,
                uvIndex: data.uvIndex,
                visiblity: data.visibility,
                humidity: data.humidity,
                time: local.Time,
                tempreature:temp,
                summary: data.summary,
                type: huftype,
                  })
        }
    })
}




module.exports = forecast;