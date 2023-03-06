/*
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/



/*
-colleghiamo l'output dove dovrà comparire la griglia in pagina

-prendiamo il bottone dalla pagina e lo assegniamo a una variabile creandoli un click
-creiamo un ciclo per generare 100 elementi (celle)
-aggiungiamo una classe che dia stile ai quadrati (css)
-e assegnamo il testo al suo interno tramite il contatore crescente

-creiamo un evento click per ogni singola cella
-che colori di azzurro e scriva in console il valore al suo interno 
*/

/*
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

/*
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/

/*
SUPERBONUS
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
*/

//output...bersagliato tramite id dal documento (HTML: il contenitore della fututra gliglia)
let outputEl = document.getElementById ('output-griglia')
//bottone...bersasgliato tramite id dal documento (HTML: bottone play che avvia il gioco)
let buttonEl = document.getElementById ('play-button')
// contatore punteggio che verra aggiornato a ogni click che non colpisca una bomba
let punteggio = 0;
// output dove si visualizza il punteggio e fine partita
let outputPunteggioEl = document.getElementById ('risultato-punteggio')


//evento click sul bottone avvio gioco
buttonEl.addEventListener ('click' , function() {
    // dichiaro e memorizzo la difficolta calcolata con una function una function 
    let difficolta = rilevaDifficolta()
    // diachiaro e memrizzo il numero di celle calcolando con una function
    let numerocelle = calcolaCelle(difficolta)
    // per pulire la criglia a ogni click (nel caso si cambi la difficolta)
    outputEl.innerHTML= ''


    let bombe = []
    // ciclo per creare le 16 bombe
    while (bombe.length < 16) {
        // genera un numero random 
        let bomba = Math.floor(Math.random() * (numerocelle) + 1 )
        // controllo del numero se sia gia presente e diverso da 0
        if (bombe.includes(bomba) || bomba == 0) {
            
        } else {
            // aggiunge la bomba alla lista delle boombe
            bombe.push(bomba)
        }
    }

    //ciclo per creare le celle che formano la griglia
    for (let i = 1 ; i <= numerocelle ; i++) {
        // dichiaro la cella creeandola con una function
        let casella = creacella(i)
        // ciclo di ogni casella con un controllo al suo interno
        for (let i = 0 ; i < numerocelle ; i++) {
            // contolla il valore della bomba che sia uguale al valore/numero della cella 
            if (bombe[i] == casella.innerText) {
                // se la condizione è vera aggiunge una classe che specifica che quella casella sia una bomba tramite una classe fittizzia vuota
                casella.classList.add ('isAbomb')
            }
        }
        
        // evento click sulla singola cella 
        casella.addEventListener ('click' , function() {
            // condizione che controlla se la cella cliccata sia una bomba o no (se la casella/il suo valore sia inclusa neila lista bombe )
            if (bombe.includes(parseInt(casella.innerText)) ) {

                // stilizazione del output dove comparirà il messaggio di fine partita e relativo punteggio accumulato
                outputPunteggioEl.style.color = 'red';
                outputPunteggioEl.style.fontSize = '40px'
                outputPunteggioEl.style.textAlign = 'center'
                outputPunteggioEl.innerHTML= 'hai beccato una bomba GAME OVER ' + 'il tuo punteggio è ' + punteggio
                
                // bersaglio tutti gli elementi con la classe fittizzia assegnata tramite la creazione delle bombe e la assegno a una variabile
                let bombaesplosa = document.querySelectorAll ('.isAbomb')
                // ciclo creato al fine di selezionare uno alla volta le bombe appena bersagliate (tramite queriselectorAll le indicizza in un array automaticamente)
                for (let i = 0 ; i<bombaesplosa.length ; i++) {
                    // aggiungo la classe necessaria a farle diventare nere
                    bombaesplosa[i].classList.add ('nera')    
                }

                console.log (bombe)
                console.log (bombaesplosa.innerHTML)
    
            } else {
                // funzione creata per selezionare e segnare il valore
                selezionaEprendiValore(casella)
                // e aumento di 1 il punteggio ogni volta che il programma entra nel altrimenti
                punteggio += 1 


                console.log(punteggio)

            }    
            },  {once : true})
    }   
})



// -------------------funzioni------------------------

function creacella(numerocelle) {

    let casella = document.createElement ('div')
    casella.classList.add('square')
    outputEl.append(casella)
    casella.innerText = numerocelle

    return casella

}

function selezionaEprendiValore(casella) {

    casella.classList.add ('verde')
    console.log (casella.innerText)  

}

function diventaNera(casella) {

    casella.classList.add ('nera')

}

function rilevaDifficolta() {

    let difficoltaEl = document.getElementById ('difficolta')
    let difficolta = difficoltaEl.value

    return difficolta 

}

function calcolaCelle (difficolta) {

    let numerocelle

    if (difficolta == 0) {
    
        alert('Scegli una difficoltà per iniziare')
    } 
        
    if (difficolta == 3) {
        numerocelle = 49
        outputEl.style.width = 'calc(50px * 7 + 10px)';
        outputEl.style.height = 'calc(50px * 7 + 10px)';
        outputEl.style.border = '5px double rgb(141, 141, 141)';
    }
    if (difficolta == 2) {
        numerocelle = 81
        outputEl.style.width = 'calc(50px * 9 + 10px)';
        outputEl.style.height = 'calc(50px * 9 + 10px)';
        outputEl.style.border = '5px double rgb(141, 141, 141)';
    } 
    
    if (difficolta ==1){
        numerocelle = 100
        outputEl.style.width = 'calc(50px * 10 + 10px)';
        outputEl.style.height = 'calc(50px * 10 + 10px)';
        outputEl.style.border = '5px double rgb(141, 141, 141)';
    }

    return numerocelle
}

// -------------------/ funzioni------------------------






// ---------------click tasto destro----------------

// casella.addEventListener('contextmenu', doRightClick, false);
        
// function doRightClick(ev) {
//     ev = ev || window.event;
//     ev.preventDefault();  // evito che intervenga il comportamento di default, l'apertura del menu
    
//     diventaNera (casella)
//     //TODO: qui faccio quello che mi serve
//     return false;
// }

// ---------------/ click tasto destro----------------
