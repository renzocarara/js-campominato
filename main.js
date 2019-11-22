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
var posNoMine = 0; // india mina NON presente
var posMine = 1; // indica mina presente
var posChecked = -1; // indica posizione già verificata dall'utente
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

// il campo minato è pronto, inizio a ciclare per recuperare gli input dell'utente
do {
    console.log("SITUAZIONE CAMPO MINATO");
    // SCOMMENTARE IL FOR QUI SOTTO PER VEDERE DOVE SONO LE MINE
    for (var i = 0; i < mineFieldArray.length; i++) {
        console.log("mineFieldArray[", i, "]", mineFieldArray[i]);
    }
    // visualizzo su Console il campo minato con i tentativi fatti
    for (var i = 0; i < mineFieldArray.length; i++) {
        if ((mineFieldArray[i] == posNoMine) || (mineFieldArray[i] == posMine)) {
            console.log("Posizione:", i + 1, "-- O (IGNOTA)");
        } else {
            console.log("Posizione:", i + 1, "-- X (VERIFICATA)");
        }
    }

    mineNotFound = false; // assumo che il gioco finisca subito a meno che l'utente sia fortunato...

    // recupero la posizione scelta dall'utente, controllo la validità
    do {
        userChoice = parseInt(prompt("Inserisci una posizione da" + fieldSizeMin + "a " + fieldSizeMax + " :"));
    } while (NumNotValid(userChoice, fieldSizeMin, fieldSizeMax));

    //controllo se la posizione indicata dall'utente è libera (non c'è una mina)
    if (mineFieldArray[userChoice - 1] == posNoMine) {
        // l'utente ha trovato una posizione libera
        mineFieldArray[userChoice - 1] = posChecked; // segno la posizione nell'array come già verificata
        attempts++; // incremento contatore tentativi validi effettuati
        mineNotFound = true; // mi segno che l'utente non è esploso ;)
        alert("BRAVO! non ci sono mine in questa posizione");
        if ((attempts) == maxAllowedAttempts) {
            alert("GAME OVER \nComplimenti hai raggiunto il massimo punteggio: " + maxAllowedAttempts);
        }

    } else if (mineFieldArray[userChoice - 1] == posChecked) {
        // l'utente mi ha richiesto una posizione già verificata,
        // non la conto come tentativo valido e proseguo
        alert("ATTENZIONE: posizione già verificata!");
        mineNotFound = true; // segno comunque che non ha trovato una mina, per proseguire

    } else {
        // l'utente ha beccato una mina
        attempts++; // incremento contatore tentativi effettuati
        alert("GAME OVER! \nBOOOOOM: hai trovato una mina!!!!!!! \nIl tuo punteggio è: " + attempts);
    }

} while ((mineNotFound) && ((attempts) < maxAllowedAttempts));


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

    // preparazione campo minato, 0="nessuna mina", 1="mina presente"
    // inizializzo campo minato (array) come tutto vuoto (nessuna mina presente)
    for (var i = 0; i < size; i++) {
        mineField[i] = 0; // 0=nessuna mina
    }

    //genero casualmente le mine e le inserisco sul campo minato (array)
    while (insertedMines < NumOfMines) {

        minePosition = generaRandom(0, size - 1); // genero una posizione casuale

        // inserisco la mina verificando che non sia già presente
        if (mineField[minePosition] == posNoMine) {
            mineField[minePosition] = posMine; // setto mina presente
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
    // funzione generica, verifica che "choice" sia un numero e compreso tra min e max
    if ((isNaN(choice)) || (choice < min) || (choice > max)) {
        return true;
    }
}