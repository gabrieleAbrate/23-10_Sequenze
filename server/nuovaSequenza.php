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

    // prendo i dati inviati dal client
    $data = json_decode(file_get_contents("php://input"));

    // controllo che il tema non sia già presente nella tabella temi
    $query = "SELECT codTema FROM temi WHERE descr = '".$data->tema."'";
    $result = $conn -> query($query);
    if($result -> num_rows > 0){
        // se il tema è già presente, prendo il suo id
        $obj -> tema = $result -> fetch_assoc();
        $obj -> tema = $obj -> tema["codTema"];
    }else{
        // se il tema non è presente, lo inserisco nella tabella temi
        $query = "INSERT INTO temi (descr) VALUES ('".$data->tema."')";
        $result = $conn -> query($query);
        // prendo l'id del tema appena inserito
        $obj -> tema = $conn -> insert_id;
        $obj -> tema = $obj -> tema["codTema"];
    }
    
    // inserisco i dati nel db
    $tema = $obj->tema;
    $img1 = $data->sequenza[0];
    $img2 = $data->sequenza[1];
    $img3 = $data->sequenza[2];
    $query = "INSERT INTO sequenze (tema, img1, img2, img3) VALUES ('$tema', '$img1', '$img2', '$img3')";
    $result = $conn -> query($query);
    // $query = "INSERT INTO sequenze (tema, img1, img2, img3) VALUES ('".$obj->tema."', '".$data->sequenza[0]."', '".$data->sequenza[1]."', '".$data->sequenza[2]."')";

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