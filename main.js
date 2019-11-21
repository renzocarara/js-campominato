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
var fieldSize = 100; // dimensione del campo minato
var mineFieldArray = []; // array che conterrà degli "0" (nessuna mina) e degli "1" (mina presente)
var maxMines = 16; // massimo numero di mine sul campo
var userChoice = 1; // input dell'utente
var attempts = 0; // tentativi effettuati dall'utente
var maxAllowedAttempts = fieldSize - maxMines; // massimo numero di tentativi consentiti all'utente


//chiedo all'utente il livello di gioco, in base al livello stabilisco dimensione del campo minato
fieldSize = getLevel();

// inizializzo il mio campo minato, passo dimensione e numero di mine che conterrà
mineFieldArray = initMineField(fieldSize, maxMines);

do {
    console.log("SITUAZIONE CAMPO MINATO");
    // SCOMMENTARE IL FOR QUI SOTTO PER VEDERE DOVE SONO LE MINE
    for (var i = 0; i < mineFieldArray.length; i++) {
        console.log("mineFieldArray[", i, "]", mineFieldArray[i]);
    }
    //visualizzo su Console il campo minato con i tentativi fatti
    // for (var i = 0; i < mineFieldArray.length; i++) {
    //     if ((mineFieldArray[i] == 0) || (mineFieldArray[i] == 1)) {
    //         console.log("Posizione n.", i + 1, " -- O (ignota)");
    //     } else {
    //         console.log("Posizione n.", i + 1, " -- X (già verificata)");
    //     }
    // }

    mineNotFound = false; // assumo che il gioco finisca

    userChoice = prompt("Inserisci una posizione da 1 a " + fieldSize + " :");

    //controllo se la posizione indicata dall'utente è libera (no mine)
    if (mineFieldArray[userChoice - 1] == 0) {

        mineFieldArray[userChoice - 1] = -1; // segno la posizione nell'array come già verificata
        attempts++; // incremento contatore tentativi validi effettuati
        mineNotFound = true; // mi segno che l'utente non è esploso ;)
        alert("BRAVO! non ci sono mine in questa posizione");
        if ((attempts) == maxAllowedAttempts) {
            alert("Complimenti hai raggiunto il massimo punteggio: " + maxAllowedAttempts + "\nGAME OVER");
        }

    } else if (mineFieldArray[userChoice - 1] == -1) {

        // l'utente mi ha richiesto una posizione già verificata,
        // non la conto come tentativo valido e proseguo
        alert("ATTENZIONE: posizione già verificata!");
        mineNotFound = true; // segno comunque che non ha trovato una mina, per proseguire

    } else {
        // l'utente ha beccato una mina
        attempts++; // incremento contatore tentativi effettuati
        alert("BOOOOOM: hai trovato una mina!!!!!!! GAME OVER!\nIl tuo punteggio è: " + attempts);
    }

} while ((mineNotFound) && ((attempts) < maxAllowedAttempts));


// la partita è finita
console.log("Il tuo punteggio è:", attempts);

// ---------------------------- FUNCTIONS -------------------------------

function getLevel() {

    //chiedo all'utente il livello e in base al valore ritorno una size da impostare per il campo di gioco
    var level = parseInt(prompt("Inserisci il livello di difficoltà [0=facile 1=intermedio 2=difficile]"));
    switch (level) {
        case 0:
            level = 50; // livello difficile
            break;
        case 1:
            level = 80; // livello medio
            break;
        default:
            level = 100; // livello di default (preimpostato - facile)
    }
    return level;
}

function initMineField(size, NumOfMines) {

    var insertedMines = 0; // contatore per le mine da inserire sul campo
    var minePosition = 1; // indice che indica la posizione della mina
    var mineField = [];

    // preparazione campo minato, 0="nessuna mina", 1="mina presente"
    // inizializzo campo minato (array) come tutto vuoto (nessuna mina presente)
    for (var i = 0; i < size; i++) {
        mineField[i] = 0; // 0=nessuna mina
    }

    //genero casualmente le mine e le inserisco sul campo minato (array)
    while (insertedMines < NumOfMines) {

        minePosition = generaRandom(0, size - 1); // genero una posizione casuale

        // inserisco la mina verificando che non sia già presente
        if (mineField[minePosition] == 0) {
            mineField[minePosition] = 1; // setto 1=mina presente
            insertedMines++; // incremento contatore mine inserite
        }
    }
    return mineField;
}

function generaRandom(min, max) {
    // genera un numero casuale intero tra min e max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}