// Il computer deve generare 16 numeri casuali tra 1 e 100 (queste saranno le mine).
// In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100.
// Se il numero è presente nella lista dei numeri generati, la partita termina
// (l'utente ha beccato una mina),
// altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato”
// o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio,
// cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS: all’inizio il software richiede anche una difficoltà all’utente
// che cambia il range di numeri casuali.
// Con difficoltà 0=> tra 1 e 100, con difficoltà 1 =>  tra 1 e 80, con difficoltà 2=> tra 1 e 50
// ------------------------------------------------------------------------------------------------
var fieldSizeMin = 1; // dimensione minima del campo minato, quindi posizione minima selezionabile
var fieldSizeMax = 100; // dimensione massima del campo minato, quindi posizione massima selezionabile
var mineFieldArray = []; // campo minato, array che conterrà elementi che indicano mina presente o non presente
var maxMines = 16; // massimo numero di mine sul campo
// -----------------------------------------------------------------------------
var isNoMine = 0; // indica mina NON presente
var isMine = 1; // indica mina presente
var isChecked = -1; // indica posizione già verificata dall'utente
// -----------------------------------------------------------------------------
var userChoice = 1; // variabile dove inserire l'input dell'utente
var attempts = 0; // tentativi effettuati dall'utente
var maxAllowedAttempts = fieldSizeMax - maxMines; // massimo numero di tentativi consentiti all'utente
var mineNotFound; // flag da settare dopo verifica della scelta utente
// -----------------------------------------------------------------------------
var level = 0; // livello di gioco scelto dall'utente [0=facile 1=medio 2=difficile]
var levelMin = 0;
var levelMax = 2;

//chiedo all'utente il livello di gioco, controllo la validità
do {
    level = parseInt(prompt("Inserisci il livello di difficoltà da " + levelMin + " [facile] a " + levelMax + " [difficile]"));
}
while (NumNotValid(level, levelMin, levelMax));

// passo il livello a una funzione che mi ritorna la dimensione del campo minato
fieldSizeMax = setfieldSizeMax(level);

// inizializzo il mio campo minato, passo dimensione e numero di mine che conterrà
mineFieldArray = initMineField(fieldSizeMax, maxMines);


// SCOMMENTARE IL FOR QUI SOTTO PER VEDERE IN CONSOLE DOVE SONO LE MINE
// console.log("SITUAZIONE CAMPO MINATO");
// for (var i = 0; i < mineFieldArray.length; i++) {
//     console.log("mineFieldArray[", i, "]", mineFieldArray[i]);
// }

// costruisco il campo minato sulla pagina HTML
HTMLBuildMineField(mineFieldArray.length);

// PROBLEMA: la finestrella del prompt mi appare prima che la pagina HTML venga visualizzata e quindi mi blocca
// l'esecuzione dello script finchè non gli do' un input, mentre io voglio vedere già la pagina HTML che ho appena
// costruito.
// VAI CON LA SPERIMENTAZIONE...
// incapsulo tutto il codice che segue, fino a fine script, in una setTimeout di 500ms, che mi consente di ritardare
// l'esecuzione del codice (quindi anche la "prompt") di mezzo secondo,
// questo perchè altrimenti l'istruzione prompt prende il controllo e blocca l'esecuzione dello script
// prima ancora che la pagina HTML, che ho costruito e valorizzato poco sopra, possa essere visualizzata dal browser
// in questo modo do' tempo al browser stesso di visualizzarmi la pagina e dopo 500ms lo script procede con il "prompt"
setTimeout(function() {

    // il campo minato è pronto, inizio a ciclare per recuperare gli input dell'utente
    do {
        // assumo che il gioco finisca subito a meno che l'utente sia fortunato...e trovi una posizione senza mina
        mineNotFound = false;

        // recupero la posizione scelta dall'utente, controllo la validità
        do {
            userChoice = parseInt(prompt("Inserisci una posizione da" + fieldSizeMin + "a " + fieldSizeMax + " :"));
        } while (NumNotValid(userChoice, fieldSizeMin, fieldSizeMax));

        //controllo se la posizione indicata dall'utente è libera (non c'è una mina)
        if (mineFieldArray[userChoice - 1] == isNoMine) {
            // l'utente ha trovato una posizione libera
            mineFieldArray[userChoice - 1] = isChecked; // segno la posizione nell'array come già verificata
            attempts++; // incremento contatore tentativi validi effettuati
            mineNotFound = true; // mi segno che l'utente non è esploso ;)
            alert("SEI FORTUNATO! non ci sono mine in questa posizione");

            // aggiorno il campo minato sulla pagina HTML
            HTMLUpdateMineField(userChoice - 1, isChecked);

        } else if (mineFieldArray[userChoice - 1] == isChecked) {
            // l'utente mi ha richiesto una posizione già verificata,
            // non la conto come tentativo valido e proseguo
            alert("ATTENZIONE: posizione già verificata!");
            mineNotFound = true; // segno comunque che non ha trovato una mina, per proseguire
        } else {
            // l'utente ha beccato una mina
            // aggiorno il campo minato sulla pagina HTML
            HTMLUpdateMineField(userChoice - 1, isMine);
        }
    }

    while ((mineNotFound) && ((attempts) < maxAllowedAttempts));

    // il ciclo è concluso, GAME OVER, verifico il punteggio dell'utente
    if ((attempts) == maxAllowedAttempts) {
        // il gioco è finito perchè l'utente ha fatto tutti i tentativi possibili senza trovare mine (è un genio!)
        alert("COMPLIMENTI!! hai raggiunto il massimo punteggio: " + maxAllowedAttempts + "\nGAME OVER");
    } else {
        // il gioco è finito perchè l'utente ha beccato una mina
        alert("BOOOOOM!! Hai trovato una mina! \nGAME OVER! \nIl tuo punteggio è: " + attempts);
    }

}, 500); // fine blocco "ritardato"

// ---------------------------- FUNCTIONS -------------------------------

function setfieldSizeMax(gameLevel) {
    // ricevo in input la scelta utente (gamelevel) e in base alla scelta fisso la dimensione del campo minato
    // più piccolo è il campo, più difficle è il gioco [0=facile 1=medio 2=difficile]
    // 0=> dimensione 100, 1 => dimensione 80, 2=> dimensione 50
    // la dimensione è gia preimpostata su 100 [0=facile]
    var size = 100;
    switch (gameLevel) {
        case 1:
            size = 80; // livello medio
            break;
        case 2:
            size = 50; // livello facile
            break;
        default:
            size = 100; // livello di default (preimpostato - facile)
    }
    return size;
}

function initMineField(size, NumOfMines) {

    var insertedMines = 0; // contatore per le mine da inserire sul campo
    var minePosition = 1; // indice che indica la posizione della mina
    var mineField = []; // array inizializzato, da restituire al chiamante

    // preparazione campo minato, isNoMine="nessuna mina", isMine="mina presente"
    // inizializzo campo minato (array) come tutto vuoto (nessuna mina presente)
    for (var i = 0; i < size; i++) {
        mineField[i] = isNoMine; // nessuna mina sul campo
    }

    //genero casualmente le mine e le inserisco sul campo minato (array)
    while (insertedMines < NumOfMines) {

        // genero una posizione casuale tra 0 e size-1 che utilizzero come indice dell'array (campo minato)
        minePosition = generaRandom(0, size - 1);

        // inserisco la mina verificando che non sia già presente
        if (mineField[minePosition] == isNoMine) {
            mineField[minePosition] = isMine; // setto mina presente
            insertedMines++; // incremento contatore mine inserite
        }
    }
    return mineField;
}

function generaRandom(min, max) {
    // genera un numero casuale intero tra min e max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function NumNotValid(choice, min, max) {
    // funzione generica, verifica se "choice" sia un numero e se è compreso tra min e max
    // basta una delle 3 condizioni non vera ed il numero non è valido, viene restituito TRUE
    if ((isNaN(choice)) || (choice < min) || (choice > max)) {
        return true; // non è un numero valido
    } else {
        return false; // il numero è valido
    }
}

// -------------------------------- HTML ---------------------------------------

function HTMLBuildMineField(mineFieldLength) {
    // costruisco il campo minato sulla pagina HTML
    // una specie di tabella fatta da righe (5, 8 o 10) di 10 elementi <span>
    for (var i = 0; i < mineFieldLength; i++) {
        document.getElementById("mineFieldContainer").innerHTML += "<span>" + (i + 1) + "</span>";
        if (((i + 1) % 10) == 0) {
            // ogni 10 elementi vado a capo, cioè costruisco righe lunghe 10 elementi <span>
            document.getElementById("mineFieldContainer").innerHTML += "<br>";
        }
    }
}

function HTMLUpdateMineField(position, setTo) {
    // recupero tutti i riferimenti agli elementi con tag <span>
    var spans = document.getElementsByTagName("span");

    if (setTo == isChecked) {
        // setto la posizione come già verificata
        spans[position].setAttribute("class", "checked");
        spans[position].innerHTML = "<i class=\"fas fa-check\"></i>";
    } else {
        // setto la posizione come mina trovata
        spans[position].setAttribute("class", "bomb");
        spans[position].innerHTML = "<i class=\"fas fa-bomb\"></i>";

    }
}