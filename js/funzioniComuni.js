'use strict'

const attributi = ['index.html', 'nuovo.html', 'stat.html'];
let nomePagina = window.location.pathname.split("/").pop().split(".")[0];

function evidenziaMenu(){
    // aggiungo gli attributi href ai link del menu
    let menu = document.querySelector("aside ul");
    let link = menu.querySelectorAll("li a");
    for(let i=0; i<link.length; i++){
        link[i].setAttribute("href", attributi[i]);
    }

    if(nomePagina == "") nomePagina = "index";
    console.log(nomePagina);
    for(let i=0; i<link.length; i++){
        if(link[i].getAttribute("href").split('/').pop().split('.')[0] == nomePagina){
            link[i].classList.add("menuAttivo");
        }
    }
}

function checkURL(url){  
    if(baseURL.includes(url)) return baseURL.replace(url, '');
    else return baseURL;
}