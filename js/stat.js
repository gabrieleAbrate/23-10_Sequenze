/*
    PER TUTTE LE PAGINE:
    1.1) Gestire l'aside come menù in maniera corretta, evidenziando la pagina 
        attualmente visualizzata
    1.2) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA (Il punto 5 inizia già in index.js -> punti totali 2.5)
    5.2) Salvare nella prima pagina i progressi dell'UTENTE LOCALE
        (Non si ha la necessità di salvarli su db)

    5.3) Mostrare in modo dinamico i progressi come da esempio
        
*/

window.onload = () => {
    evidenziaMenu();
    // creazione dinamica di un elemento
    let div = `<div>
                <div>` + localStorage.getItem('tema') + `</div>
                <div>` + localStorage.getItem('tempo') + `</div>
                <div> ` + localStorage.getItem('sequenze') + `</div>
                <div>Giorno: ` + new Date().toLocaleDateString(); +`</div>
            </div>`;
    bloccoDiv = document.getElementById('stat');
    bloccoDiv.innerHTML += div;
}