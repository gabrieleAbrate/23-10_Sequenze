<?php

    // inizializzo l'oggetto che conterrà la risposta al client
    $obj = null;

    // inizializza una connessione a un database MySQL
    $indirizzoServerDBMS = "localhost";
    $nomeDB = "semipuzzle";
    $conn = mysqli_connect($indirizzoServerDBMS, "root", "", $nomeDB);

    // verifica la connessione
    if($conn -> connect_errno)
        $obj = getRisposta(-1, "Errore connessione al DBMS");
    else
        $obj = getRisposta(0, "Connessione al DBMS effettuata");

    // seleziono un riga casuale dal DB e prendo tutti i suoi campi
    // e collego l'id al tema (non fatto)
    $query = "SELECT * FROM sequenze ORDER BY RAND() LIMIT 1";
    $result = mysqli_query($conn, $query);

    // salvo i messaggi nel mio oggetto di risposta
    if($result -> num_rows > 0){
        $obj -> puzzle = $result -> fetch_assoc();
        $obj -> cod = 0;
        $obj -> desc = "Puzzle caricato correttamente";
    }else{
        $obj -> cod = 1;
        $obj -> desc = "Puzzle non trovato";
    }

    // chiudo la connessione al DB
    mysqli_close($conn);

    echo json_encode($obj);



    function getRisposta($cod, $desc, $obj = null){
    if(!$obj) $obj = new stdClass();
    $obj -> cod = $cod;
    $obj -> desc = $desc;
    return $obj;
    }

?>