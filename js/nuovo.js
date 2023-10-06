/*
    PER TUTTE LE PAGINE:
    1.1) Gestire l'aside come menù in maniera corretta, evidenziando la pagina 
        attualmente visualizzata
    1.2) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA
    6.1) Ogni volta che viene incollato un indirizzo nelle caselle di testo è necessario
        mostrare nell'immagine corrispondente (sopra la casella) l'immagine di cui si è dato il link
        PUNTI:1.5
    
    6.2) Cliccando sul bottone inserisci è necessario inserire la nuova sequenza su db

*/

'use strict'
let baseURL = window.location.href;

window.onload = () => {
    evidenziaMenu();
    baseURL = checkURL('nuovo.html');
    console.log(baseURL);

    let bloccoInput = document.querySelectorAll('#sequenzaGiusta input');
    bloccoInput.forEach((input) => {
        let idInput = input.id.split('')[input.id.length - 1];
        input.addEventListener('paste', (e) => {
            let immagine = e.clipboardData.getData('text');
            let img = document.getElementById('img' + idInput);
            img.setAttribute('src', immagine);
        });
    });

    let btnInserisci = document.getElementById('btnInserisci');
    btnInserisci.addEventListener('click', async () => {
        let sequenza = [];
        bloccoInput.forEach((input) => {
            if(input.value != '') sequenza.push(input.value);
        });
        let tema = document.getElementById('txtTitolo').value;
        console.log(sequenza);
        let busta = await fetch(baseURL + 'server/nuovaSequenza.php', {
            method: 'POST',
            body: JSON.stringify({sequenza, tema})
        });
        busta = await busta.json();
        console.log(busta);
    });
}