

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
    



                a.innerHTML = `rain probability: ${data.forecast.pp}`;
                b.innerHTML = `Pressure: ${data.forecast.pressure}`;
                c.innerHTML = `Uv Index: ${data.forecast.uvIndex}`;
                d.innerHTML = `Visibility: ${data.forecast.visiblity}`;
                e.innerHTML = `Time: ${data.forecast.time}`;
                f.innerHTML = `Humidity: ${data.forecast.humidity}`;
                g.innerHTML = ` ${data.forecast.tempreature}&#8451;`;
                j.innerHTML = `Sunrise time: ${data.forecast.sunrise}`;
                k.innerHTML = `Visibility: ${data.forecast.sunset}`;
                h.innerHTML = `${data.forecast.summary}`;
                i.innerHTML = `${data.location}`;
              })
            
        })
    })