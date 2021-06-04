'use strict'

function llenartext(mensaje){
    console.log(document.querySelector('#mailtext'));
    document.querySelector('#mailtext').innerHTML = texto;
}

const minuto_inicial = 2;
let time = minuto_inicial * 60;

const divcont = document.getElementById("countdowd");

var temp = setInterval(updatecountdowd, 1000);            

function updatecountdowd(){
    const minuto = Math.floor(time / 60);
    let second = time % 60;

    second = second < 10 ? '0' + second : second;

    divcont.innerHTML = `0${minuto} :${second} min`;
    time--;
    if(time == -1){
    console.log(time);
        clearInterval(temp);
        console.log(document.getElementById("ingresar"));
    }
    
}
