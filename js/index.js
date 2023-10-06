/*
    PER TUTTE LE PAGINE:
    1.1) Gestire l'aside come menù in maniera corretta, evidenziando la pagina 
        attualmente visualizzata
    1.2) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA
    2) Caricare il puzzle: immagini e titolo prendendone uno a caso da quelli sul db
        Le immagini su db sono ordinate, quindi è NECESSARIO disordinarle. 
        PUNTI: 2

    3) Cercare di presentare sempre puzzle diversi 
        (quando sono stati tutti presentati avvertire l'utente)
        PUNTI: 0.5

    4.1)  Una mossa è definita da un click su una delle immagini,
        effettuato un click l'immagine selezionata viene spostata nella cella vuota
        (il click sulla cella vuota non ha conseguenze)
        PUNTI: 1.5
        
    4.2) Cambiare puzzle dopo tre mosse o quando si è indovinata la sequenza


    5.1) Gestire il tempo di risoluzione, il numero di sequenze/puzzle risolvi,
        il numero di mosse effettuate
        PUNTI: 2.5
*/

'use strict'
let baseURL = window.location.href;
let mosse = 0;
let tempo = 0;
let timer;

window.onload = async () => {
    evidenziaMenu();
    baseURL = checkURL('index.html');

    document.getElementById('seq').innerHTML = parseInt(localStorage.getItem('sequenze'));

    let busta = await fetch(baseURL + 'server/getPuzzle.php');
    busta = await busta.json();
    console.log(busta);

    caricaPuzzle(busta.puzzle);
    // ricontrollo che il puzzle caricato non sia già risolto
    if(checkPuzzle(busta.puzzle)) location.reload();

    alert('puzzle caricato con successo');

    // aggiungo il click ad ogni immagine ( tranne quella vuota )
    let imgDiv = document.querySelectorAll('#gioco img');
    imgDiv.forEach(img => {
        img.addEventListener('click', () => { sposta(img, busta.puzzle) });
    });
}

function caricaPuzzle(puzzle){
    let arr = [puzzle.img1, puzzle.img2, puzzle.img3];
    let imgDiv = document.querySelectorAll('#gioco img');

    for(let i = 0; i < 3; i++){
        // prendo una posizione casuale non ancora occupata controllando che non sia già occupata
        let pos = Math.floor(Math.random() * arr.length);
        while(imgDiv[pos].src != ''){
            pos = Math.floor(Math.random() * arr.length + 1);
        }
        // inserisco l'immagine nella posizione casuale
        imgDiv[pos].src = arr[i];
    }
}

function checkPuzzle(puzzle){
    let imgDiv = document.querySelectorAll('#gioco img');
    if(imgDiv[0].src == puzzle.img1 && imgDiv[1].src == puzzle.img2 && imgDiv[2].src == puzzle.img3) return true;
    else return false;
}

function sposta(img, puzzle){
    if(img.src == '') return;
    let vuota;
    // faccio partire un timer che conti ogni secondo che passa
    if(timer == undefined){
        timer = setInterval(() => {
            tempo++;
            document.getElementById('tempo').innerHTML = tempo;
        }, 1000);
    }
    // prendo l'immagine vuota
    let imgDiv = document.querySelectorAll('#gioco img');
    imgDiv.forEach(img => {
        if(img.src == '') vuota = img;
    });
    console.log(vuota);
    // sposto l'immagine cliccata nella posizione della vuota
    vuota.src = img.src;
    img.removeAttribute('src');
    // controllo se il puzzle è stato risolto
    if(checkPuzzle(puzzle) && mosse <= 3){
        alert('puzzle risolto in ' + mosse + ' mosse');
        localStorage.setItem('sequenze', parseInt(localStorage.getItem('sequenze')) + 1);
        location.reload();
        // chiudo il timer
        clearInterval(timer);
    }
    else if(mosse >= 3){
        alert('hai esaurito le mosse');
        location.reload();
        // chiudo il timer
        clearInterval(timer);
    }
    document.getElementById('mosse').innerHTML = mosse;
    mosse++;
}