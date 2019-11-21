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
var fieldSize = 10; // dimensione del campo minato
var mineFieldArray = []; // array che conterrà degli "0" (nessuna mina) e degli "1" (mina presente)
var maxMines = 3; // massimo numero di mine sul campo
var insertedMines = 0; // contatore per le mine da inserire sul campo (in fase di inizializzazione)
var minePosition = 1; // indice che indica la posizione della mina (in fase di inizializzazione)
var userChoice = 1; // input dell'utente
var attempts = 0; // tentativi validi effettuati dall'utente
var maxAllowedAttempts = fieldSize - maxMines; // massimo numero di tentativi consentiti all'utente
var level = 0; // livello di difficoltà

// preparazione campo minato, 0="nessuna mina", 1="mina presente"
// inizializzo campo minato (array) come tutto vuoto (nessuna mina presente)
for (var i = 0; i < fieldSize; i++) {
    mineFieldArray[i] = 0; // 0=nessuna mina
}

//genero casualmente le mine e le inserisco sul campo minato (array)
while (insertedMines < maxMines) {

    minePosition = generaRandom(0, fieldSize - 1); // genero una posizione casuale
    // console.log("minePosition: ", minePosition);
    // console.log("mineFieldArray[minePosition]:", mineFieldArray[minePosition]);

    // inserisco la mina verificando che non sia già presente
    if (mineFieldArray[minePosition] == 0) {
        mineFieldArray[minePosition] = 1; // setto 1=mina presente
        insertedMines++; // incremento contatore mine inserite
        // console.log("incremento mine inserite:", insertedMines);
        // alert("sono dentro al if");
    }
    // console.log("campo minato", mineFieldArray);
} // while
// console.log("mine inserite:", insertedMines);
// console.log("campo minato", mineFieldArray);


do {
    // situazione campo minato
    for (var i = 0; i < fieldSize; i++) {
        console.log("mineFieldArray[", i, "]", mineFieldArray[i]);
    }

    mineNotFound = false; // assumo che il gioco finisca

    userChoice = prompt("Inserisci un numero da 1 a " + fieldSize + " :")
    console.log("verifico la posizione", userChoice - 1);

    if (mineFieldArray[userChoice - 1] == 0) {
        console.log("CASO: NON C'E' MINA");
        mineFieldArray[userChoice - 1] = -1; // marco la posizione come già richiesta
        attempts++; // incremento contatore tentativi validi
        mineNotFound = true; // mi segno che l'utente non è esploso ;)
    } else if (mineFieldArray[userChoice - 1] == -1) {
        console.log("CASO: POSIZIONE GIA' VERIFICATA");
        // l'utente mi ha richiesto una posizione già verificata,
        // non la conto come tentativo valido e proseguo
        alert("ATTENZIONE: posizione già verificata!")
        mineNotFound = true; // segno comunque che non ha trovato una mina
    } else {
        console.log("CASO: C'E' LA MINA");
        // l'utente a beccato una mina
        alert("BOOOOOM: hai trovato una mina!!!!!!! GAME OVER!")
    }

} while (mineNotFound && attempts < maxAllowedAttempts);


// la partita è finita
console.log("Hai effettuato", attempts, "tentativi con successo");

function generaRandom(min, max) {
    // genera un numero casuale intero tra min e max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}