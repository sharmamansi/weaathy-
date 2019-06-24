

console.log('loaded');


const getForm = document.querySelector('form');
const searchtext =  document.querySelector('input');
document.querySelector('.body2').style.display ="none" ; 

document.querySelector('#redirect').style.display = "none";



getForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const location =searchtext.value ;
    searchtext.textContent = '';
    console.log(location);
 
const changeText = (element,value,changed) => {
    element.addEventListener('mouseover',(e) => {
        e.preventDefault()
        element.innerHTML = value + ' : ' + changed 
    })  
}

const change = (element,changed) => {
    element.addEventListener('mouseover',(e) => {
        e.preventDefault()
        element.innerHTML = changed 
    })  
}

    fetch('/whether?address=' + location).then((response) => {
        response.json().then((data) => {
    
                
                //console.log(data);
                document.querySelector('.body').style.display = "none"; 
                document.querySelector('.body2').style.background = 'url("/img/'+ data.forecast.type + '.jpg")' ; 
                document.querySelector('.body2').style.display ="block" ; 
                document.querySelector('#redirect').style.display = "inline-block";

                const a= document.getElementById('precip');
                const b = document.getElementById('pres');
                const c = document.getElementById('uv');
                const d = document.getElementById('vis');
                const e = document.getElementById('time');
                const f = document.getElementById('hum');
                const j = document.getElementById('rise');
                const k = document.getElementById('set');
                const g = document.getElementById('temp2');
                const h = document.getElementById('ab');
                const i = document.getElementById('cd');
    



                changeText(a,'rain probability',data.forecast.pp);
                changeText(b,'pressure',data.forecast.pressure);
                changeText(c,'UvIndex',data.forecast.uvIndex);
                changeText(d,'Visibility',data.forecast.visiblity);
                changeText(e,'Time',data.forecast.time);
                changeText(f,'Humidity',data.forecast.humidity);
                change(g,data.forecast.tempreature + '&#8451;');
                changeText(j,'sunrise',data.forecast.sunrise);
                changeText(k,'sunset',data.forecast.sunset);
                change(h,data.forecast.summary);
                change(i,data.location);
              })
            
        })
    })